import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { JOB_CATEGORIES } from '@/lib/data';
import { verifyAdminSession, ADMIN_COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const FULL_LOKER_NOTICE =
  'Mohon Maaf, Saat Ini Lowongan Kerja Remote Sedang Penuh. Informasi Lowongan Terbaru Akan Segera Kami Update.';

// GET all remote jobs & full status
export async function GET(req: NextRequest) {
  try {
    const admin = req.nextUrl.searchParams.get('admin') === 'true';

    // If requesting unpublished jobs or admin mode, verify session
    if (admin) {
      const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
      const isAuthed = await verifyAdminSession(token);
      if (!isAuthed) {
        return NextResponse.json(
          { error: 'Akses ditolak. Sesi admin diperlukan.' },
          { status: 401 }
        );
      }
    }

    const where: any = {};
    if (!admin) {
      where.isPublished = true;
    }

    const jobs = await prisma.remoteJob.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    // Check if admin toggled the "Lowongan Penuh" mode
    let isLokerFull = false;
    try {
      const setting = await prisma.analyticMetric.findFirst({
        where: { eventType: 'SETTING_LOKER_FULL' },
        orderBy: { createdAt: 'desc' },
      });
      if (setting) {
        isLokerFull = setting.label === 'true';
      }
    } catch (e) {
      console.warn('Could not read SETTING_LOKER_FULL from DB:', e);
    }

    return NextResponse.json({
      success: true,
      jobs: jobs || [],
      isLokerFull,
      fullNoticeText: FULL_LOKER_NOTICE,
    });
  } catch (error: any) {
    console.error('Error fetching remote jobs:', error);
    return NextResponse.json({
      success: true,
      jobs: [],
      isLokerFull: false,
      fullNoticeText: FULL_LOKER_NOTICE,
    });
  }
}

// PATCH toggle loker full status (Admin only)
export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthed = await verifyAdminSession(token);
    if (!isAuthed) {
      return NextResponse.json(
        { error: 'Akses ditolak. Sesi admin diperlukan.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const isLokerFull = Boolean(body?.isLokerFull);

    await prisma.analyticMetric.create({
      data: {
        eventType: 'SETTING_LOKER_FULL',
        label: isLokerFull ? 'true' : 'false',
        metadata: {
          updatedAt: new Date().toISOString(),
        },
      },
    });

    return NextResponse.json({
      success: true,
      isLokerFull,
      fullNoticeText: FULL_LOKER_NOTICE,
      message: isLokerFull
        ? 'Mode lowongan penuh diaktifkan (pop-up tayang di halaman user).'
        : 'Mode lowongan penuh dinonaktifkan (loker tayang normal).',
    });
  } catch (error: any) {
    console.error('Error toggling loker full status:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal mengubah status lowongan' },
      { status: 500 }
    );
  }
}

// POST create a new remote job (Admin only)
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthed = await verifyAdminSession(token);
    if (!isAuthed) {
      return NextResponse.json(
        { error: 'Akses ditolak. Sesi admin diperlukan.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      title,
      company,
      location,
      salary,
      type,
      category,
      tags,
      description,
      applyUrl,
    } = body;

    if (!title || !company) {
      return NextResponse.json(
        { error: 'Judul dan nama perusahaan wajib diisi' },
        { status: 400 }
      );
    }

    const selectedCategory = category || 'Remote Job';
    const jobTags: string[] = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
      ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [];

    const created = await prisma.remoteJob.create({
      data: {
        title,
        company,
        location: location || 'WFH / Remote Indonesia',
        salary: salary || 'Kompetitif',
        type: type || 'Full-time Remote',
        posted: 'Hari ini',
        primarySideJob: selectedCategory,
        tags: jobTags,
        description: description || '',
        applyUrl: applyUrl || '',
        isPublished: true,
        order: 0,
      },
    });

    return NextResponse.json({ success: true, job: created }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating remote job:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal menambahkan lowongan' },
      { status: 500 }
    );
  }
}

// PUT update an existing remote job (Admin only)
export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthed = await verifyAdminSession(token);
    if (!isAuthed) {
      return NextResponse.json(
        { error: 'Akses ditolak. Sesi admin diperlukan.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      id,
      title,
      company,
      location,
      salary,
      type,
      category,
      tags,
      applyUrl,
      description,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID lowongan wajib diisi' }, { status: 400 });
    }

    const dataToUpdate: Record<string, any> = {};
    if (title !== undefined) dataToUpdate.title = title;
    if (company !== undefined) dataToUpdate.company = company;
    if (location !== undefined) dataToUpdate.location = location;
    if (salary !== undefined) dataToUpdate.salary = salary;
    if (type !== undefined) dataToUpdate.type = type;
    if (applyUrl !== undefined) dataToUpdate.applyUrl = applyUrl;
    if (description !== undefined) dataToUpdate.description = description;

    if (category) {
      dataToUpdate.primarySideJob = category;
    }

    if (tags !== undefined) {
      const parsedTags = Array.isArray(tags)
        ? tags
        : typeof tags === 'string'
        ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        : [];
      dataToUpdate.tags = parsedTags;
    }

    const updated = await prisma.remoteJob.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, job: updated });
  } catch (error: any) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal memperbarui data lowongan' },
      { status: 500 }
    );
  }
}

// DELETE a remote job (Admin only)
export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthed = await verifyAdminSession(token);
    if (!isAuthed) {
      return NextResponse.json(
        { error: 'Akses ditolak. Sesi admin diperlukan.' },
        { status: 401 }
      );
    }

    let id = req.nextUrl.searchParams.get('id');

    if (!id) {
      try {
        const body = await req.json();
        id = body?.id;
      } catch {
        // no body
      }
    }

    if (!id) {
      return NextResponse.json({ error: 'ID lowongan wajib diisi' }, { status: 400 });
    }

    // Safely delete without throwing if record not found
    const res = await prisma.remoteJob.deleteMany({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Lowongan berhasil dihapus',
      count: res.count,
    });
  } catch (error: any) {
    console.error('Error deleting remote job:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal menghapus lowongan' },
      { status: 500 }
    );
  }
}

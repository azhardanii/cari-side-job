import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { REMOTE_JOBS_DB, JOB_CATEGORIES } from '@/lib/data';

export const dynamic = 'force-dynamic';

// GET all remote jobs
export async function GET() {
  try {
    const jobs = await prisma.remoteJob.findMany({
      where: { isPublished: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    if (!jobs || jobs.length === 0) {
      return NextResponse.json({ success: true, jobs: REMOTE_JOBS_DB });
    }

    return NextResponse.json({ success: true, jobs });
  } catch (error: any) {
    console.error('Error fetching remote jobs:', error);
    return NextResponse.json({ success: true, jobs: REMOTE_JOBS_DB });
  }
}

// POST create a new remote job
export async function POST(req: NextRequest) {
  try {
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

    const selectedCategory = category || JOB_CATEGORIES[0];
    const jobTags: string[] = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
      ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [selectedCategory];

    if (!jobTags.includes(selectedCategory)) {
      jobTags.unshift(selectedCategory);
    }

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

// PUT update an existing remote job
export async function PUT(req: NextRequest) {
  try {
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
      if (category && !parsedTags.includes(category)) {
        parsedTags.unshift(category);
      }
      dataToUpdate.tags = parsedTags;
    } else if (category) {
      // make sure category is represented
      const existing = await prisma.remoteJob.findUnique({ where: { id } });
      if (existing) {
        const nextTags = [...existing.tags];
        if (!nextTags.includes(category)) nextTags.unshift(category);
        dataToUpdate.tags = nextTags;
      }
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

// DELETE a remote job
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');

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

    await prisma.remoteJob.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Lowongan berhasil dihapus' });
  } catch (error: any) {
    console.error('Error deleting remote job:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal menghapus lowongan' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession, ADMIN_COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

function cleanLynkUrl(rawUrl: string): string {
  let url = (rawUrl || '').trim();
  if (!url) return '';
  url = url.split('?')[0].replace(/\/+$/, '');
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  return url;
}

// GET all products
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get('admin') === 'true';

    // If requesting admin-only unpublished products, verify session
    if (isAdmin) {
      const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
      const isAuthed = await verifyAdminSession(token);
      if (!isAuthed) {
        return NextResponse.json(
          { error: 'Akses ditolak. Sesi admin diperlukan.' },
          { status: 401 }
        );
      }
    }

    const whereClause = isAdmin ? {} : { isPublished: true };

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal mengambil data produk', products: [] },
      { status: 500 }
    );
  }
}

// POST create a new product (Admin only)
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
      category,
      type,
      desc,
      price,
      badge,
      url,
      imageUrl,
      sideJob,
      isPublished = true,
      order = 0,
    } = body;

    if (!title || !url) {
      return NextResponse.json(
        { error: 'Judul dan URL produk wajib diisi' },
        { status: 400 }
      );
    }

    const cleanUrl = cleanLynkUrl(url);

    const created = await prisma.product.create({
      data: {
        title: title.trim(),
        category: category || 'Ebook',
        type: type || 'digital',
        desc: desc ? desc.trim() : '',
        price: price ? price.trim() : '',
        badge: badge ? badge.trim() : '',
        url: cleanUrl,
        imageUrl: imageUrl ? imageUrl.trim() : '',
        sideJob: sideJob ? sideJob.trim() : '',
        isPublished: isPublished ?? true,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal menambahkan produk' },
      { status: 500 }
    );
  }
}

// PUT update an existing product (Admin only)
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
      category,
      type,
      desc,
      price,
      badge,
      url,
      imageUrl,
      sideJob,
      isPublished,
      order,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID produk wajib diisi' }, { status: 400 });
    }

    const dataToUpdate: Record<string, any> = {};
    if (title !== undefined) dataToUpdate.title = title.trim();
    if (category !== undefined) dataToUpdate.category = category;
    if (type !== undefined) dataToUpdate.type = type;
    if (desc !== undefined) dataToUpdate.desc = desc.trim();
    if (price !== undefined) dataToUpdate.price = price.trim();
    if (badge !== undefined) dataToUpdate.badge = badge ? badge.trim() : '';
    if (url !== undefined) dataToUpdate.url = cleanLynkUrl(url);
    if (imageUrl !== undefined) dataToUpdate.imageUrl = imageUrl ? imageUrl.trim() : '';
    if (sideJob !== undefined) dataToUpdate.sideJob = sideJob ? sideJob.trim() : '';
    if (isPublished !== undefined) dataToUpdate.isPublished = Boolean(isPublished);
    if (order !== undefined) dataToUpdate.order = Number(order) || 0;

    const updated = await prisma.product.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal memperbarui data produk' },
      { status: 500 }
    );
  }
}

// DELETE a product (Admin only)
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
      return NextResponse.json({ error: 'ID produk wajib diisi' }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Produk berhasil dihapus' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal menghapus produk' },
      { status: 500 }
    );
  }
}

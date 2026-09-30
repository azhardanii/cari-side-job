import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      wa,
      email,
      profesi,
      topMatch,
      topMatchScore = 92,
      readinessScore = 0,
      personaName = '',
      skills = [],
      tools = [],
      gaps = [],
      topMatches = null,
    } = body;

    if (!name || !wa || !email) {
      return NextResponse.json(
        { error: 'Nama, WhatsApp, dan Email wajib diisi.' },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        wa,
        email,
        profesi: profesi || 'Lainnya',
        topMatch: topMatch || 'Side Job Specialist',
        topMatchScore: Number(topMatchScore) || 92,
        readinessScore: Number(readinessScore) || 0,
        personaName,
        skills: Array.isArray(skills) ? skills : [],
        tools: Array.isArray(tools) ? tools : [],
        gaps: Array.isArray(gaps) ? gaps : [],
        topMatches: topMatches || undefined,
      },
    });

    // Also record completion in analytics
    await prisma.analyticMetric.create({
      data: {
        eventType: 'LEAD_CAPTURE',
        label: lead.topMatch,
        metadata: { leadId: lead.id, readinessScore: lead.readinessScore },
      },
    });

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating lead:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal menyimpan data lead' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('q')?.toLowerCase() || '';

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const totalStartsCount = await prisma.analyticMetric.count({
      where: { eventType: 'QUIZ_START' },
    });

    const totalLeads = leads.length;
    const totalStarts = Math.max(totalStartsCount, totalLeads);

    const conversionRate =
      totalStarts > 0 ? ((totalLeads / totalStarts) * 100).toFixed(1) + '%' : '0%';

    const avgReadiness =
      totalLeads > 0
        ? Math.round(
            leads.reduce((acc, l) => acc + (l.readinessScore || 0), 0) /
              totalLeads
          ) + '%'
        : '0%';

    // Calculate most popular top match
    const jobFrequency: Record<string, number> = {};
    leads.forEach((l) => {
      const job = l.topMatch ? l.topMatch.split('(')[0].trim() : 'Side Job';
      jobFrequency[job] = (jobFrequency[job] || 0) + 1;
    });

    let popularJob = '-';
    let maxCount = 0;
    Object.entries(jobFrequency).forEach(([job, count]) => {
      if (count > maxCount) {
        maxCount = count;
        popularJob = job;
      }
    });

    // Filter by search query if requested
    const filteredLeads = query
      ? leads.filter(
          (l) =>
            l.name.toLowerCase().includes(query) ||
            l.email.toLowerCase().includes(query) ||
            l.wa.includes(query) ||
            l.profesi.toLowerCase().includes(query) ||
            l.topMatch.toLowerCase().includes(query)
        )
      : leads;

    return NextResponse.json({
      success: true,
      leads: filteredLeads,
      stats: {
        totalStarts,
        totalLeads,
        conversionRate,
        avgReadiness,
        popularJob,
      },
    });
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal mengambil data leads' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const leadId = searchParams.get('id');
    const isReset = searchParams.get('reset') === 'true';

    if (isReset) {
      await prisma.lead.deleteMany();
      await prisma.analyticMetric.deleteMany();
      return NextResponse.json({ success: true, message: 'Seluruh data berhasil direset' });
    }

    if (!leadId) {
      return NextResponse.json({ error: 'ID lead wajib diberikan' }, { status: 400 });
    }

    await prisma.lead.delete({
      where: { id: leadId },
    });

    return NextResponse.json({ success: true, message: 'Lead berhasil dihapus' });
  } catch (error: any) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal menghapus lead' },
      { status: 500 }
    );
  }
}

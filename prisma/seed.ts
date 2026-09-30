import { PrismaClient } from '@prisma/client';
import { REMOTE_JOBS_DB } from '../src/lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial Remote Jobs to Supabase...');
  for (let i = 0; i < REMOTE_JOBS_DB.length; i++) {
    const job = REMOTE_JOBS_DB[i];
    await prisma.remoteJob.upsert({
      where: { id: job.id },
      update: {
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        type: job.type,
        posted: job.posted,
        primarySideJob: job.primarySideJob,
        tags: job.tags,
        description: job.description,
        applyUrl: job.applyUrl,
        order: i,
      },
      create: {
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        type: job.type,
        posted: job.posted,
        primarySideJob: job.primarySideJob,
        tags: job.tags,
        description: job.description,
        applyUrl: job.applyUrl,
        order: i,
      },
    });
  }
  console.log('Seeding complete! 12 Remote Jobs synced to Supabase.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

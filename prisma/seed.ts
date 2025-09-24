import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@clickup-api.com' },
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists, skipping seeding');
    return;
  }

  // Create default admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@clickup-api.com',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Created admin user:', {
    id: adminUser.id,
    email: adminUser.email,
    role: adminUser.role,
  });

  // Create sample editor user
  const editorPassword = await bcrypt.hash('Editor123!', 10);

  const editorUser = await prisma.user.create({
    data: {
      email: 'editor@clickup-api.com',
      passwordHash: editorPassword,
      role: 'EDITOR',
    },
  });

  console.log('✅ Created editor user:', {
    id: editorUser.id,
    email: editorUser.email,
    role: editorUser.role,
  });

  // Create sample viewer user
  const viewerPassword = await bcrypt.hash('Viewer123!', 10);

  const viewerUser = await prisma.user.create({
    data: {
      email: 'viewer@clickup-api.com',
      passwordHash: viewerPassword,
      role: 'VIEWER',
    },
  });

  console.log('✅ Created viewer user:', {
    id: viewerUser.id,
    email: viewerUser.email,
    role: viewerUser.role,
  });

  console.log('\n🎉 Database seeding completed!');
  console.log('\n📋 Default Users Created:');
  console.log('┌─────────────────────────────┬──────────────┬─────────┐');
  console.log('│ Email                       │ Password     │ Role    │');
  console.log('├─────────────────────────────┼──────────────┼─────────┤');
  console.log('│ admin@clickup-api.com       │ Admin123!    │ ADMIN   │');
  console.log('│ editor@clickup-api.com      │ Editor123!   │ EDITOR  │');
  console.log('│ viewer@clickup-api.com      │ Viewer123!   │ VIEWER  │');
  console.log('└─────────────────────────────┴──────────────┴─────────┘');
  console.log('\n🔐 You can now log in with any of these credentials!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

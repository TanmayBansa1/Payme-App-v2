import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '9999999999' },
    update: {},
    create: {
      number: '9999999999',
      password: 'alice',
      name: 'alice',
      authType: "Phone",
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
          endTime: new Date(),
        },
      },
    },
  })
//   id        String   @id @default(cuid())
//   amount    Int
//   token     String @unique
//   userId    String
//   provider  String
//   status    OnRampStatus
//   startTime DateTime @default(now())
//   endTime   DateTime
//   user  
  const bob = await prisma.user.upsert({
    where: { number: '9999999998' },
    update: {},
    create: {
      number: '9999999998',
      password: 'bob',
      name: 'bob',
      authType: "Phone",
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: "Failed",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
          endTime: new Date(),
        },
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
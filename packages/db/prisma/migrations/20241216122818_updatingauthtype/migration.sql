/*
  Warnings:

  - The values [Email] on the enum `AuthType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuthType_new" AS ENUM ('Google', 'Github', 'Phone');
ALTER TABLE "User" ALTER COLUMN "authType" TYPE "AuthType_new" USING ("authType"::text::"AuthType_new");
ALTER TABLE "Merchant" ALTER COLUMN "authType" TYPE "AuthType_new" USING ("authType"::text::"AuthType_new");
ALTER TYPE "AuthType" RENAME TO "AuthType_old";
ALTER TYPE "AuthType_new" RENAME TO "AuthType";
DROP TYPE "AuthType_old";
COMMIT;

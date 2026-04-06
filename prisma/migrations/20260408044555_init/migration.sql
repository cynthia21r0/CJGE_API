-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "path" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "errorCode" TEXT NOT NULL,
    "session_id" INTEGER NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Logs" ADD CONSTRAINT "Logs_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");

function DriveService() {
  let auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  return google.drive({
    version: "v3",
    auth: auth.fromJSON(
      /**service account configurations here */
      {
        type: "service_account",
        project_id: "movers-325617",
        private_key_id: "da71eada55516d85460dce877141c3506eb507c7",
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDugZavna7qrcjW\nqs02fQEFvhf0asC9xc3U8WfvdHwjhZXH4T0QOzBHYVQJm6FKBdoNhcQFdXgNwmVQ\nv442CgwAhRR87p9GfEFDoEKr/OZOxTfr/ihMygEAZnfPo0bECkZqsR9inReNN2qz\ndd+HApJ3JCZclV5X31vhqN4WulHXvvE7OB1F+n0GZeF7q8eaMsi3dhQzTIrW0eji\nkR4YGJK2biR9v+aF12MqWijoViCd1rVcjtv2Ff8yNOujqzDMJx4zWMRE5bu/lVXx\nSUc6zz4oTL54xe7VY+2iRSaX/2tyfcYpJXN2nzxKAVP7AVm4XxqmYbpY6IbEWwVL\nWGuP1H7rAgMBAAECggEAZyiRvl+bWlHUPlUd8WVb3dn8jnDl8K7vehz38XAWiV6s\nDAn12WFgXl9Qc99mgZfKWnLy99F5HappG+XeYq0xx7/HvsmPBnOT3uYgMDdwfb17\nlI0XbS8qA7xOMfbTEtPG5Tq68nIzz5aahgiDp+eK5hEyrnTEm4k2OoJJnNb1szRD\nYNll8IWkt0l1/QBW5RoO8Qqcb006MedqO87f/nRCwlhy+Ir6FVtykMysUupYPNY5\n+CIJ8lIZlN31wNzH1KnCyWafy9iiQ78rgOXuxA4i4kOU0oYeGfsHMk22G8nc+eRm\nn3tlAi6Mih5sN32MuFSSFpVm+aPbQ7QNbpS0/7G6YQKBgQD8hezrHPLYWZp16szS\nLuDRwN0G1hkbw8s1FiAKRGbipV+EKMOkQLhPo6bdCwRJZCjPMk9LR3roVxUQb4/8\nPdO05IhkrhVyLU1JmAZ2eh4RRDozBbAta0n/mQGJmCnGcIMLMndDi5BLt1G6LN83\nYtciSfvz0n1/oTGRh3ew17p+gwKBgQDxykHeWdaqI7dzGAL+i7vYxVht5BOl/gFD\np80JFfaRNduNOx7Oilv3OFDhsmEJ+GWtiSqvJnfeRoKd0ddkcdhNX2sxx0Deumvk\nGtLwc9iUS5ECNan4ilUqC7+gdCzqbJcJ5diTUe2pfbBIvc6TNTSk3ZXTZOwz6xWA\nPZmRHhgReQKBgBeQ1/9JAFC4a/W9J8gln81zVi0hJc61gu09V1gd8gwMqtFGjJtz\nfr/P4e6W7Jt8wWI0q7m2vf2Ywtp5ztIXYv5qpV/f7xhsqd3IVjIQS2YJG/VO/pX+\ngTVdLguNK7jdHx2YZBDloV2viez56wrcKn+EsAKdDiEvBdUy8zSJrVnJAoGBAMJp\nRTMaez8MPtn9CZNQGXc/nk2loKLMLIoQpwzSKxIxAtp5GdkqaK3MC0SeH+ZbYq34\n52gzfxgrC6UH769k1m3H9jHtK1yq+ktLwiXyj8cVR4BGU+dymu2WyrqiDudi7sLX\nm59Atd6dIBws+adllXGmdWym7kEEmaImZY7IasPJAoGAQyBUT5po9g7i6NVFGuWP\nIRzbbvlR7L3FEzAy6eFq6M+gsb8nNvNuiYbNeFSPwpj5mCzDwZOacCsv7Hj0UG8s\nu+Xi0qIJH4Nl+aOMwnQRgJZV9HmX2YO37ZVDz2g3t+sgFtfPklGRzCuR8vF/0wno\nO/Q6GRCFdtAGE+UsXoGhV6s=\n-----END PRIVATE KEY-----\n",
        client_email: "movers@movers-325617.iam.gserviceaccount.com",
        client_id: "108758868171748542210",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
          "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url:
          "https://www.googleapis.com/robot/v1/metadata/x509/movers%40movers-325617.iam.gserviceaccount.com",
      }
    ),
  });
}

exports.upload = async function upload({
  folder = "1fkR9ffVzHT3n0YjUd8iX-HsYBAJB_5xs",
  fileName,
  mimeType,
  body,
}) {
  const driveService = DriveService();

  const metadata = {
    name: fileName,
    parents: [folder],
  };

  const media = {
    mimeType,
    body,
  };

  return driveService.files.create({
    resource: metadata,
    media,
    fields: "id",
  });
};

exports.getFileStream = async function getFileStream(fileId) {
  const driveService = DriveService();
  let { data } = await driveService.files.get(
    {
      fileId: fileId,
      alt: "media",
    },
    { responseType: "stream" }
  );

  return data;
};

exports.deleteFile = function deleteFile(fileId) {
  const driveService = DriveService();

  return driveService.files.delete({
    fileId,
  });
};

exports.listFiles = function listFiles() {
  const driveService = DriveService();
  return driveService.files.list({
    pageSize: 10,
    fields: "nextPageToken, files(id, name)",
  });
};

export default ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST_NAME"),
        port: env("SMTP_PORT"),
        auth: {
          user: env("SMTP_USER"),
          pass: env("SMTP_PASS"),
        },
      },
      settings: {
        defaultFrom: env("SMTP_FROM_ADDRESS"),
        defaultReplyTo: env("SMTP_FROM_ADDRESS"),
      },
    },
  },
});

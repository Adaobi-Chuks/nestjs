import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  apiVersion: process.env.API_VERSION,
  awsBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
  awsCloudFrontUrl: process.env.CLOUDFRONT_DISTRIBUTION_URL,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsRegion: process.env.AWS_REGION,
  mailHost: process.env.MAIL_HOST,
  smptUsername: process.env.SMTP_USERNAME,
  smptPassword: process.env.SMTP_PASSWORD,
  mailPort: process.env.MAIL_PORT
}));
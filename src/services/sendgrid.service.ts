import _ from 'lodash';
import mailer, { MailDataRequired } from '@sendgrid/mail';
import { logger } from 'src/services/logger.service';
import dotenv from 'dotenv';

dotenv.config();

const { SENDGRID_API_KEY, SENDGRID_SENDER_EMAIL, SENDGRID_SENDER_NAME } = process.env;
if (SENDGRID_API_KEY) mailer.setApiKey(SENDGRID_API_KEY);

type EmailData = string | { name?: string; email: string };
interface MailContent {
  type: string;
  value: string;
}
type Mail = Omit<MailDataRequired, 'from'> &
  ({ text: string } | { html: string } | { templateId: string } | { content: MailContent[] & { 0: MailContent } });

const send = async (mail: Mail): Promise<void> => {
  let to: EmailData;
  let from: EmailData;
  try {
    if (!SENDGRID_SENDER_EMAIL) {
      throw new Error(`SendGrid sendMail: "SENDGRID_SENDER_EMAIL" environment variable is required but not specified.`);
    }

    to = JSON.stringify(mail.to);
    from = { email: SENDGRID_SENDER_EMAIL, name: SENDGRID_SENDER_NAME };
    const data = { ...mail, from };
    await mailer.send(data);

    logger.mail(`Successfully send email from [${JSON.stringify(from)}] to [${to}] via SendGrid.`);
    return Promise.resolve();
  } catch (e) {
    if (to) {
      const errors = _.get(e, 'response.data.errors') || [];
      logger.mail(
        `Failed to send mail from [${JSON.stringify(from)}] to [${to}] via SendGrid.\n${
          _.isEmpty(errors) ? e : JSON.stringify(errors)
        }`
      );
    }
    return Promise.reject(e);
  }
};

export const sendgrid = { send };

export default sendgrid;

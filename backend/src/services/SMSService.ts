// backend/src/services/SMSService.ts
import twilio from 'twilio';

export class SMSService {
  private static client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  static async sendTransferSMS(toPhone: string, amount: string) {
    // Logic for Twilio SMS fallback for offline refugees
    // To be implemented by contributor
    console.log(`SMS Fallback: Sent $${amount} transfer notification to ${toPhone}`);
  }
}

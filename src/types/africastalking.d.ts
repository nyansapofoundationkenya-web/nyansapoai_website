declare module 'africastalking' {
  interface SMSOptions {
    to: string[];
    message: string;
    from?: string;
  }

  interface SMSResponse {
    SMSMessageData: {
      Message: string;
      Recipients: Array<{ 
        statusCode: number;
        number: string;
        cost: string;
        status: string;
      }>;
    };
  }

  interface AfricaTalkingClient {
    SMS: {
      send(options: SMSOptions): Promise<SMSResponse>;
    };
  }

  function africastalking(config: { username: string; apiKey: string }): AfricaTalkingClient;
  export default africastalking;
}
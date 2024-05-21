const { CognitoIdentityServiceProvider } = require("aws-sdk");
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
const USER_POOL_ID = "eu-central-1_Id0YexaBu";

const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'eu-central-1' });

const getUserEmail = async (event) => {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: event.identity.claims.username
  };
  const user = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
  const { Value: email } = user.UserAttributes.find((attr) => {
    if (attr.Name === "email") {
      return attr.Value;
    }
    throw new Error("Email not found for user");
  });
  return email;
};



exports.handler = async (event) => {
    try {
    const { id, total ,address } = event.arguments.input ;
    const { username } = event.identity.claims;
    const email = await getUserEmail(event);
    
    const emailParams = {
        Source: "berganpeter98@gmail.com",
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Subject: {
                Data: 'Order Confirmation'
            },
            Body: {
                Text: {
                    Data: `Hello,${username}. 
                    Thank you for your order.Your order id : ${id}.
                    Your address: ${address},  
                    Your total is ${total}.` 
                }
            }
        }
    };

        const data = await ses.sendEmail(emailParams).promise();
        console.log("Email sent:", data);
    } catch (err) {
        console.error("Failed to send email:", err);
        console.log(id,total);
    }
};
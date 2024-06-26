const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();


const ORDER_TABLE = "Order-qca3k74klvaipfqtacedrcdwhm-prod";
const ORDER_TYPE = "Order";
const BIKE_ORDER_TABLE = "BikeOrder-qca3k74klvaipfqtacedrcdwhm-prod";
const BIKE_ORDER_TYPE = "BikeOrder";

const createOrder = async (payload) => {
  const { order_id, username, email, total } = payload;
  var params = {
    TableName: ORDER_TABLE,
    Item: {
      id: order_id,
      __typename: ORDER_TYPE,
      customer: email,
      user: username,
      total: total,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  };
  console.log(params);
  await documentClient.put(params).promise();
};

const createBikeOrder = async (payload) => {
  let bikeOrders = [];
  for (i = 0; i < payload.cart.length; i++) {
    const cartItem = payload.cart[i];
    bikeOrders.push({
      PutRequest: {
        Item: {
          id: uuidv4(),
          __typename: BIKE_ORDER_TYPE,
          bike_id: cartItem.id,
          order_id: payload.order_id,
          customer: payload.email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    });
  }
  let params = {
    RequestItems: {}
  };
  params["RequestItems"][BIKE_ORDER_TABLE] = bikeOrders;
  console.log(params);
  await documentClient.batchWrite(params).promise();
};


exports.handler = async (event) => {
  try {
    let payload = event.prev.result;
    payload.order_id = uuidv4();

    await createOrder(payload);

    await createBikeOrder(payload);

 

    return "SUCCESS";
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
};

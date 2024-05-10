/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const processOrder = /* GraphQL */ `
  mutation ProcessOrder($input: ProcessOrderInput!) {
    processOrder(input: $input)
  }
`;
export const createBike = /* GraphQL */ `
  mutation CreateBike(
    $input: CreateBikeInput!
    $condition: ModelBikeConditionInput
  ) {
    createBike(input: $input, condition: $condition) {
      id
      name
      description
      image
      brand
      featured
      price
      orders {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBike = /* GraphQL */ `
  mutation UpdateBike(
    $input: UpdateBikeInput!
    $condition: ModelBikeConditionInput
  ) {
    updateBike(input: $input, condition: $condition) {
      id
      name
      description
      image
      brand
      featured
      price
      orders {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBike = /* GraphQL */ `
  mutation DeleteBike(
    $input: DeleteBikeInput!
    $condition: ModelBikeConditionInput
  ) {
    deleteBike(input: $input, condition: $condition) {
      id
      name
      description
      image
      brand
      featured
      price
      orders {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBikeOrder = /* GraphQL */ `
  mutation CreateBikeOrder(
    $input: CreateBikeOrderInput!
    $condition: ModelBikeOrderConditionInput
  ) {
    createBikeOrder(input: $input, condition: $condition) {
      id
      bike_id
      order_id
      order {
        id
        user
        date
        total
        createdAt
        updatedAt
        customer
        __typename
      }
      createdAt
      updatedAt
      bike {
        id
        name
        description
        image
        brand
        featured
        price
        createdAt
        updatedAt
        __typename
      }
      customer
      __typename
    }
  }
`;
export const updateBikeOrder = /* GraphQL */ `
  mutation UpdateBikeOrder(
    $input: UpdateBikeOrderInput!
    $condition: ModelBikeOrderConditionInput
  ) {
    updateBikeOrder(input: $input, condition: $condition) {
      id
      bike_id
      order_id
      order {
        id
        user
        date
        total
        createdAt
        updatedAt
        customer
        __typename
      }
      createdAt
      updatedAt
      bike {
        id
        name
        description
        image
        brand
        featured
        price
        createdAt
        updatedAt
        __typename
      }
      customer
      __typename
    }
  }
`;
export const deleteBikeOrder = /* GraphQL */ `
  mutation DeleteBikeOrder(
    $input: DeleteBikeOrderInput!
    $condition: ModelBikeOrderConditionInput
  ) {
    deleteBikeOrder(input: $input, condition: $condition) {
      id
      bike_id
      order_id
      order {
        id
        user
        date
        total
        createdAt
        updatedAt
        customer
        __typename
      }
      createdAt
      updatedAt
      bike {
        id
        name
        description
        image
        brand
        featured
        price
        createdAt
        updatedAt
        __typename
      }
      customer
      __typename
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      user
      date
      total
      bikes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      customer
      __typename
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      user
      date
      total
      bikes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      customer
      __typename
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      user
      date
      total
      bikes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      customer
      __typename
    }
  }
`;

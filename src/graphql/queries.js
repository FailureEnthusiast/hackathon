/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTruck = /* GraphQL */ `
  query GetTruck($id: ID!) {
    getTruck(id: $id) {
      id
      firstName
      lastName
      location
      lowFuel
      lampOut
      fogLamp
      oil
      tire
      engTemp
      traction
      antilockBreak
      tractionControlMalfunction
      engineWarning
      battery
      seatBelt
      airbag
      washerFluid
      img
      filePath
      createdAt
      updatedAt
      speed
    }
  }
`;
export const listTrucks = /* GraphQL */ `
  query ListTrucks(
    $filter: ModelTruckFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrucks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        location
        lowFuel
        lampOut
        fogLamp
        oil
        tire
        engTemp
        traction
        antilockBreak
        tractionControlMalfunction
        engineWarning
        battery
        seatBelt
        airbag
        washerFluid
        img
        filePath
        createdAt
        updatedAt
        speed
      }
      nextToken
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTruck = /* GraphQL */ `
  mutation CreateTruck(
    $input: CreateTruckInput!
    $condition: ModelTruckConditionInput
  ) {
    createTruck(input: $input, condition: $condition) {
      id
      firstName
      lastName
      heartRate
      oxygen
      systolic
      diastolic
      temperature
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
      createdAt
      updatedAt
    }
  }
`;
export const updateTruck = /* GraphQL */ `
  mutation UpdateTruck(
    $input: UpdateTruckInput!
    $condition: ModelTruckConditionInput
  ) {
    updateTruck(input: $input, condition: $condition) {
      id
      firstName
      lastName
      heartRate
      oxygen
      systolic
      diastolic
      temperature
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteTruck = /* GraphQL */ `
  mutation DeleteTruck(
    $input: DeleteTruckInput!
    $condition: ModelTruckConditionInput
  ) {
    deleteTruck(input: $input, condition: $condition) {
      id
      firstName
      lastName
      heartRate
      oxygen
      systolic
      diastolic
      temperature
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
      createdAt
      updatedAt
    }
  }
`;

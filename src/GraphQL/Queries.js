import { gql } from 'graphql-request';

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_CURRENCIES_AND_CATEGORIES = gql`
  query {
    currencies {
      label
      symbol
    }
    categories {
      name
    }
  }
`;

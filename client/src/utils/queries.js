import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id
            savedBooks {
                bookId
                authors
                description
                title
                image
            }
        }
    }
`;
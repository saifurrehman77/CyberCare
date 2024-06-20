import React, {createContext, useState, useContext} from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
  const [isfetchUserStatusAndComments, setisfetchUserStatusAndComments] =
    useState('overall');
  //const [contentcombinedResults, setcontentcombinedresults] = useState(null);
  const [isfetchUserDataforBullying, setisfetchUserDataforBullying] =
    useState('overall');

  return (
    <UserContext.Provider
      value={{
        isfetchUserStatusAndComments,
        setisfetchUserStatusAndComments,
        isfetchUserDataforBullying,
        setisfetchUserDataforBullying,
      }}>
      {children}
    </UserContext.Provider>
  );
};

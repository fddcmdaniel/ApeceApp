
import { Center, Spinner } from 'native-base';
import React from 'react';

const Loading = () => {

  return (
    <Center w="full" h="full" backgroundColor="white">
      <Spinner size="lg" color="teal.700" />
    </Center>
  );
};

export default Loading;
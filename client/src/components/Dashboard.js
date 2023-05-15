import { Card, Stack, Image, CardBody, Heading, Flex, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";


function Dashboard() {
  
  return(
    <main className="login">
      <Card
        direction={{base: 'column', sm: 'row'}}
        overflow='hidden'
        varitant='outline'
      >
        <Flex align='center'>
          <Image
            marginLeft='10px'
            objectFit='cover'
            boxSize='300px'
            maxW={{ base: '100%', sm: '300px' }}
            src='/img/PE-CoE-badge-300.png'
            alt='Login'
          />
        </Flex>
        <Stack>
          <CardBody width='600px'>
            <Heading size='md'>Choose an action</Heading>
            <Stack>
              <Button variant="solid" colorScheme="whiteAlpha"><Link to="/create">Create new Entry</Link></Button>
              &nbsp;
              <Button variant='solid' colorScheme='whiteAlpha' disabled='true'>List Entries</Button>
              &nbsp;
              <Button variant='solid' colorScheme='whiteAlpha' disabled='true'>Report</Button>
            </Stack>
          </CardBody>
        </Stack>
        
      </Card>
    </main>
  );
}

export default Dashboard;
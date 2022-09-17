import React from 'react'
import { useToast, Box, Tabs, Tab, TabList, TabPanels, TabPanel} from '@chakra-ui/react'
import SideDrawer from '../components/miscellanous/SideDrawer'
import AddOfferedService from '../components/services/AddOfferedService'
import AddRequiredService from '../components/services/AddRequiredService'
import ErrorPage from './ErrorPage'
import { useLocation } from 'react-router-dom'

const AddServices = () => {

  const [insertPost, setInsertPost] = React.useState(true)
  const [error, setError] = React.useState()

  const toast = useToast()
  const location = useLocation()

  function check() {
    if (location.state) {
      if (location.state.info.plan === 'free' && location.state.postsNumber === 1) {
        toast({
            title: 'With Free plan you can insert only one Offered Service',
            status: 'warning',
            duration: 5000,
            position: 'bottom',
            isClosable: true
        })
        setInsertPost(false)
        return
      } else if (location.state.info.plan === 'cheap' && location.state.postsNumber === 3) {
        toast({
            title: 'With Cheap plan you can insert only three Offered Services',
            status: 'warning',
            duration: 5000,
            position: 'bottom',
            isClosable: true
        })
        setInsertPost(false)
        return
      }
    } else {
      setError(401)
    }
  }

  React.useEffect(() => {
    check()
  },[])

  if (!location.state) {
    return (
      <div syle={{ width:'100%'}}>
        <SideDrawer />
        <ErrorPage error={error} />
      </div>
    )
  } else {
    if (location.state.info.username) {
      return (
        <div>
          <SideDrawer />
            { insertPost ? (
              <Box w="100%" p={4} borderRadius="2xl" color="black">
                <Tabs variant='soft-rounded' colorScheme='green' >
                  <TabList mb="1em">
                    <Tab width="50%">Offered Service</Tab>
                    <Tab width="50%">Required Service</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <AddOfferedService info={location.state.info} />
                    </TabPanel>
                    <TabPanel>
                      <AddRequiredService info={location.state.info} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            ) : (
              <Box            
              w="100%"
              m="40px 0 15px 0"
              >
                <AddRequiredService info={location.state.info} />
              </Box>
            )}
        </div>
      )
    } else {
      return (
        <div>
          <SideDrawer />
          <Box            
            w="100%"
            m="40px 0 15px 0"
            >
            <AddOfferedService info={location.state.info} />
          </Box>
        </div>
      )
    }
  }
}

export default AddServices
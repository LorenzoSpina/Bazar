import React from 'react'
import SideDrawer from '../components/miscellanous/SideDrawer'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Box, Badge, Image, VStack, Button, useToast } from '@chakra-ui/react'
import UpdateService from '../components/services/UpdateService'
import axios from 'axios'

const ServiceUserPage = () => {

    const [post, setPost] = React.useState()
    const [isOwner, setIsOwner] = React.useState(false)
    const [update, setUpdate] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const location = useLocation()
    const navigate = useNavigate()
    const toast = useToast()

    function fetchInfo() {
        if (location.state) {
            const info = JSON.parse(localStorage.getItem('userInfo'))
            if (info) {
                if (info.data.name) {
                    if (info.data.name === location.state.user) setIsOwner(true)
                } else if (info.data.username) {
                    if (info.data.username === location.state.user) setIsOwner(true)
                }
            }
            const _post = {
                id: location.state.id,
                user: location.state.user,
                picture: location.state.picture,
                title: location.state.title,
                description: location.state.description,
                place: location.state.place,
                price: location.state.price,
                dataRequired: location.state.dataRequired,
                dataCreation: location.state.dataCreation,
                lastUpdate: location.state.lastUpdate
            }
            setPost(_post)
        }
    }

    const handleUpdate = () => setUpdate(!update)

    const del = async () => {
        setLoading(true)
        try {
            if (post.dataRequired) {
                const config = {
                    params: {
                        username: post.user,
                        idPost: post.id
                    }
                }
                await axios.delete('/delete-required-service', config)
            } else {
                const config = {
                    params: {
                        user: post.user,
                        idPost: post.id
                    }
                }
                await axios.delete('/delete-offered-service', config)
            }
            toast({
                title: "Post deleted correctly",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
                })
            setLoading(false)
            navigate('/services')
        } catch (err) {
            toast({
                title: "Error Occured!",
                description: err.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchInfo()
    },[])

    if(post) {
        if (update) {
            return (
                <div>
                    <SideDrawer />
                    <UpdateService post={post} />
                </div>
            )
        } else {
            return (
                <div>
                    <SideDrawer/>
                    <VStack>
                        <Box margin='2%' w='60%' borderWidth='5px' borderRadius='lg' display='flex' overflow='hidden'>
                            <Image height='500px' w='50%' src={post.picture} alt='hi' />
                            <Box w='50%'>
                                <Box alignItems='baseline'>
                                    <Badge borderRadius='full' px='10' colorScheme='teal'>
                                        Title
                                    </Badge>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        textTransform='uppercase'
                                        ml='2'
                                    >
                                        {post.title}
                                    </Box>
                                </Box>
                                <Box alignItems='baseline'>
                                    <Badge borderRadius='full' px='10' colorScheme='teal'>
                                        Description
                                    </Badge>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        ml='2'
                                    >
                                        {post.description}
                                    </Box>
                                </Box>
                                <Box alignItems='baseline'>
                                    <Badge borderRadius='full' px='10' colorScheme='teal'>
                                        Place
                                    </Badge>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        ml='2'
                                    >
                                        {post.place}
                                    </Box>
                                </Box>
                                {post.dataRequired ? (
                                    <Box alignItems='baseline'>
                                        <Badge borderRadius='full' px='10' colorScheme='teal'>
                                            Data Required
                                        </Badge>
                                        <Box
                                            color='gray.500'
                                            fontWeight='semibold'
                                            letterSpacing='wide'
                                            fontSize='xs'
                                            ml='2'
                                        >
                                            {post.dataRequired.split('T')[0]}
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box alignItems='baseline'>
                                        <Badge borderRadius='full' px='10' colorScheme='teal'>
                                            Price
                                        </Badge>
                                        <Box
                                            color='gray.500'
                                            fontWeight='semibold'
                                            letterSpacing='wide'
                                            fontSize='xs'
                                            textTransform='uppercase'
                                            ml='2'
                                        >
                                            {post.price}€
                                        </Box>
                                    </Box>
                                )}
                                <Box alignItems='baseline'>
                                    <Badge borderRadius='full' px='10' colorScheme='teal'>
                                        Data Creation
                                    </Badge>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        textTransform='uppercase'
                                        ml='2'
                                    >
                                        {post.dataCreation.split('T')[0]}
                                    </Box>
                                </Box>
                                <Box alignItems='baseline'>
                                    <Badge borderRadius='full' px='10' colorScheme='teal'>
                                        Last Update
                                    </Badge>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        textTransform='uppercase'
                                        ml='2'
                                    >
                                        {post.lastUpdate.split('T')[0]}
                                    </Box>
                                </Box>
                                {isOwner ? (
                                    <Box>
                                        <Box alignItems='baseline'>
                                            <Badge borderRadius='full' px='10' colorScheme='teal'>
                                                Post ID
                                            </Badge>
                                            <Box
                                                color='gray.500'
                                                fontWeight='semibold'
                                                letterSpacing='wide'
                                                fontSize='xs'
                                                textTransform='uppercase'
                                                ml='2'
                                            >
                                                {post.id}
                                            </Box>
                                        </Box>
                                        <Button
                                        mt='5%'
                                        colorScheme={'blue'}
                                        width='30%'
                                        onClick={handleUpdate}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                        mt='5%'
                                        colorScheme='red'
                                        width='30%'
                                        isLoading={loading}
                                        onClick={del}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Box alignItems='baseline'>
                                        <Badge borderRadius='full' px='10' colorScheme='teal'>
                                            User
                                        </Badge>
                                        <Box
                                            color='gray.500'
                                            fontWeight='semibold'
                                            letterSpacing='wide'
                                            fontSize='xs'
                                            textTransform='uppercase'
                                            ml='2'
                                        >
                                            {post.user}
                                        </Box>
                                        </Box>
                                        <Link
                                            to="/chats"
                                            state={{ user: post.user}}
                                        >
                                            <Button
                                            mt='5%'
                                            colorScheme={'blue'}
                                            width='50%'
                                            >
                                                Contact {post.user}
                                            </Button>
                                        </Link>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </VStack>
                </div>
            )
        }
    }
}

export default ServiceUserPage
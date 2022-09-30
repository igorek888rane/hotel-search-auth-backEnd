export const userDto = (user,token) => {
    const {password,__v, ...userDto} = user
    userDto.token = token
    return userDto
}
import { useState, useEffect } from 'react'
import axios from 'axios'

// Типизация пользователя
type UserType = {
    login: 'string'
    id: number
    avatar_url: 'string'
    followers: 'number'
}

type SearchUserType = {
    login: string
    id: number
}

type DitialsPropsType = {
    selectedUser: SearchUserType | null
}

function Ditails(props: DitialsPropsType) {

    // Локальный стейт для отображения деталей о пользователе
    const [userDitails, setUserDitails] = useState<null | UserType>(null)

    // Показываем детали выбранного пользователя, делаем запрос на сервер для получения подробностей о выбранном(selectedUser) пользователе
    useEffect(() => {
        // отправляем запрос через axios, с типизацией.
        if (!!props.selectedUser) {
            axios
                .get<UserType>(`https://api.github.com/users/${props.selectedUser}`)
                .then((response) => setUserDitails(response.data))
        }
    }, [props.selectedUser])

    return (
        <div>
            <h2>{userDitails?.login}</h2>
            {userDitails && <div>
                <img src={userDitails.avatar_url} alt="img" />
            </div>}
            <br />
            followers: {userDitails?.followers}
        </div>
    )
}

export default Ditails
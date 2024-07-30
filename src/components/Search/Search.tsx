import { useEffect, useState} from 'react'

type SearchPropsType = {
    value: string
    onSubmit: (fixedValue: string) => void
}

function Search(props: SearchPropsType) {

    // Локальный стейт, управляет временным значением в инпуте
    const [temporarySearch, setTemporarySearch] = useState('')

    useEffect( () => {
        setTemporarySearch(props.value)
    }, [props.value])

    return (
        <div>
            <div>
                <input placeholder="search" value={temporarySearch} onChange={(e) => setTemporarySearch(e.currentTarget.value)} /> <button onClick={() => {
                    props.onSubmit(temporarySearch)
                }}>find</button>
            </div>
        </div>
    )
}

export default Search
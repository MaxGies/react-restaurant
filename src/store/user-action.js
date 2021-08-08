import { userActions } from './user'

export const fetchCardData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                'https://react-firebase-c1c37-default-rtdb.asia-southeast1.firebasedatabase.app/user.json'
            );

            if(!response.ok){
                throw new Error('Error to send Data')
            }

            const data = await response.json();

            return data;
        }

        try {
            const userData = await fetchData();
            dispatch(userActions.replaceQueue(userData));
        }catch (error){

        }
    }
}

export const sendData = async (user) => {
    return async (dispatch) => {
        //can handel loading
        
        const response = await fetch(
            'https://react-firebase-c1c37-default-rtdb.asia-southeast1.firebasedatabase.app/user.js',
            {
                method: 'PUT',
                body: JSON.stringify(user),
            }
        )

        if(!response.ok){
            throw new Error('Error to send Data')
        }

            //can handle success
        try {
            await sendData();
            
        }catch (error){
            //can handle load fail
        }
    }
}

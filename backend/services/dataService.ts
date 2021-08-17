import db from '../db'
import { payloadType } from '../types'

class _DataService {
    async getData() {
        let _data = await db.query('SELECT * FROM person')
        let data = _data.rows
        let numerator = 0 //количество пользователей, вернувшихся в систему в X-ый день или позже
        let denominator = 0 // (количество пользователей, установивших приложение 7 дней назад или раньше
        let result = null
        let liveTime: any = {} //! any
        data.forEach(element => {
            const reg = element.date_registration
            const activ = element.date_last_activity
            console.log(((activ - reg) / 86400000))
            if ( ((activ - reg) / 86400000) >= 7 ){
                numerator++
            }
            if (Date.now() - reg >= 7*86400000) {
                denominator++
            }
            
            liveTime[element.id] = ((activ - reg ) / 86400000)
        })
        result = ((numerator * 100) / denominator).toFixed(2)
        // console.log(numerator, denominator)
        // console.log(lives)
         
        // console.log(result + '%')
        return {liveTime, result}
    }
   async setData(body: any){
        await db.query('TRUNCATE TABLE person')
        console.log(body.items)
        await body.items.forEach((element: payloadType) => {
         db.query('INSERT INTO person (id,  date_registration, date_last_activity) VALUES ($1, $2, $3) RETURNING *', [element.id, element.registrationDate, element.activityDate]); 
        }); 
        return 'successfully added'
    }
}

export const DataService = new _DataService();
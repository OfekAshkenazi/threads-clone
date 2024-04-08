import cron from 'cron'
import https from "https"

const URL = "https://threads-clone-r3zx.onrender.com/"

const job = new cron.CronJob("*/14 * * * *", function () {
    https.get(URL,(res) => {
        if(res.statusCode = 200) {
            console.log("Get request success")
        }else {
            console.log("Get request fail: ", res.statusCode)

        }

    }).on("error",(e) => {
        console.log("Error while sending request: ", e)
    })
})



export default job
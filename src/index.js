import * as functions from 'firebase-functions'
import axios from 'axios'

const config = functions.config()

const LINE_API_URL = 'https://api.line.me/v2/bot/message'
const REQUEST_HEADER = {
  'Content-Type': `application/json`,
  Authorization: `Bearer ${config.line.access_token}`,
}

export let test = functions.https.onRequest((req, res) => {
  res.status(200).send(`OK`)
})

export let linebot = functions.https.onRequest((req, res) => {
  if (req.body.events[0].message.type !== 'text') {
    return
  }
  let text = req.body.events[0].message.text

  if (text === '/eat') {
    let food = [
      'กะหรี่ปั๊บ',
      'แกงบอน',
      'แกงป่า',
      'แกงเขียวหวาน',
      'แกงไตปลา',
      'แกงส้ม',
      'แกงเผ็ดเป็ดย่าง',
      'แกงเลียง',
      'แกงมัสมั่น',
      'แกงเหลือง',
      'แกงเทโพ',
      'แกงจืด',
      'แกงโฮะ',
      'กุนเชียง',
      'แกงไก่',
      'กุ้งพริกไทย',
      'กุ้งชุบแป้งทอด',
      'กุ้งแช่น้ำปลา',
      'ไก่อบพริกไทยดำ',
      'แกงกะหรี่ไก่',
      'ขนมจีน',
      'ข้าวคลุกกะปิ',
      'ข้าวผัดสับปะรด',
      'ข้าวมันไก่',
      'ข้าวยำ',
      'ข้าวห่อใบบัว',
      'ไข่เจียว',
      'ไข่ต้ม',
      'ไข่ลูกเขย',
      'ไข่พะโล้หมูสามชั้น',
      'ข้าวแช่',
      'ต้มยำ',
      'ต้มยำแซบ',
      'ต้มข่า',
      'ต้มจืด',
      'ผัดกระเพรา',
      'ผัดขี้เมา',
      'ผัดไท',
      'ผัดซีอิ้ว',
      'ผัดฉ่า',
      'ผัดวุ้นเส้น',
      'ผักบุ้งไฟแดง',
      'ผักคะน้าปลาเค็ม',
      'ส้มตำ',
      'สุกีไทย',
      'ลาบ',
      'ราดหน้า',
      'ห่อหมก',
      'ปลาร้าทรงเครื่อง',
      'ปลาราดพริก',
      'พะแนง',
      'พะแนงไก่',
      'พล่าเนื้อ',
      'ยำใหญ่',
      'ยำทวาย',
      'แหนม',
      'ปูจ๋า',
      'ปูนิ่มผัดพริกไทดำ',
      'ตำผลไม้',
      'บะหมี่หมูแดง',
      'หมูกะทะ',
      'หอยหลอดผัดฉ่า',
      'ไก่ต้มน้ำปลา',
      'ไก่อบฟาง',
      'ไก่ทอดน้ำปลา',
      'ปลากระพงทอดน้ำปลา',
      'งบปลา',
      'คั่วกลิ้งหมู',
      'หลนปูเค็ม',
      'แจงลอน',
      'หรุ่ม',
      'ล่าเตียง',
      'สาคูไส้หมู',
      'ปลาทับทิมลุยสวน',
      'แกงเทโพหมู',
      'ผัดกระเพราหมู',
    ]
    axios({
      method: `POST`,
      url: `${LINE_API_URL}/reply`,
      headers: REQUEST_HEADER,
      data: {
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: `text`,
            text: food[Math.floor(Math.random() * food.length)],
          },
        ],
      },
    })
  } else if (text === '/riffycat') {
    axios({
      method: `POST`,
      url: `${LINE_API_URL}/reply`,
      headers: REQUEST_HEADER,
      data: {
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            type: 'image',
            originalContentUrl:
              'https://storage.rayriffy.com/files/image/99E41DA7-740D-4912-B59E-3FD5BB13D952.jpeg',
            previewImageUrl:
              'https://storage.rayriffy.com/files/image/99E41DA7-740D-4912-B59E-3FD5BB13D952.jpeg',
          },
        ],
      },
    })
  } else if (text === '/moe') {
    axios({
      method: `GET`,
      url: `https://api.pixiv.moe/v1/ranking?page=${Math.round(Math.random()) +
        1}`,
      responseType: 'json',
    }).then(res => {
      let selected =
        res.data.response.works[
          Math.floor(Math.random() * res.data.response.works.length)
        ]
      axios({
        method: `POST`,
        url: `${LINE_API_URL}/reply`,
        headers: REQUEST_HEADER,
        data: {
          replyToken: req.body.events[0].replyToken,
          messages: [
            {
              type: 'text',
              text:
                selected.work.title +
                ' by ' +
                selected.work.user.name +
                '\nSource: https://www.pixiv.net/member_illust.php?mode=medium&illust_id=' +
                selected.work.id,
            },
            {
              type: 'image',
              originalContentUrl: selected.work.image_urls.large,
              previewImageUrl: selected.work.image_urls.px_480mw,
            },
          ],
        },
      })
      return 0
    })
  } else {
    res.status(200).send(`OK`)
  }
})

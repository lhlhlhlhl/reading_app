import {
    Swiper,
    Image,
} from 'react-vant'

const SwiperBook = () => {
    const imgs = [
        {
            id: 1,
            url: 'https://tse4.mm.bing.net/th/id/OIP.Bgj3bDk-3DlAciXK4d983AHaE3?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        },
        {
            id: 2,
            url: 'https://tse4.mm.bing.net/th/id/OIP.jDTV4rTZxyD7wktMGw4l8QHaFV?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        },
        {
            id: 3,
            url: 'https://tse1.mm.bing.net/th/id/OIP.-QEd5tq2-M7NZRbVEs1GQAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        },
        {
            id: 4,
            url: 'https://tse4.mm.bing.net/th/id/OIP.OLUDXfM23uOZffMoGhk9AgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        },
        {
            id: 5,
            url: 'https://tse2.mm.bing.net/th/id/OIP.P054VkIvNf-ZFl8HJzbDGAHaFV?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        },
    ]

  return (
    <div style={{ width: '100%', height: '200px' ,padding: '0px 16px',}}>
      <Swiper autoplay={3000} style={{ width: '100%', height: '100%' ,borderRadius:'10px',shadow:'0 0 10px rgba(0, 0, 0, 0.5)'}}>

        {
            imgs.map((item)=>{
                return (
                    <Swiper.Item key={item.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image lazyLoad src={item.url} style={{ maxWidth: '100%', maxHeight: '100%',borderRadius:'10px' }} />                    
                    </Swiper.Item>
                )
            })
        }
    </Swiper>
    </div>
  )
}
export default SwiperBook;

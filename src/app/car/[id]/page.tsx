import prisma from '@/utils/prisma'
import Link from 'next/link'
import carImage from '@/resources/car.jpg'

const fetchCarDetail = async (id: string) => {
  const car = await prisma.car.findUnique({
    where: {
      id: id,
    },
    include: {
      model: true,
      brand: true,
    },
  })
  return car
}

const CarDetailPage = async ({ params }: { params: { id: string } }) => {
  const car = await fetchCarDetail(params.id)

  return (
    /*<div>
      
      <div className='mx-auto max-w-3xl flex flex-col rounded-md bg-orange-200 px-10 py-5 shadow-sm shadow-gray-400'>
        <div>Značka: <b>{car?.brand.name}</b></div>
        <div>{car?.model.name}</div>
        <div>{car?.description}</div>
        <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'><Link href={'/'}>Home</Link></button>
        
      </div>
      
    </div>*/
    <div className="mx-auto max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src="https://jansoulak.cz/getImage.php" alt="Car photo"></img>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{car?.brand.name} {car?.model.name} </div>
        <p className="text-gray-700 text-base">
          {car?.description}
        </p>
      </div>
      <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'><Link href={'/'}>Home</Link></button>
    </div>
  )
}

export default CarDetailPage

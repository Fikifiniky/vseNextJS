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
  const price = (car?.price > 0) ? car?.price : "cena na vyžádání" //zvlastni
  return (
    <div className="mx-auto max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center">
      <img className="w-full" src="https://image.jansoulak.cz" alt="Car photo"></img>
      <div className="px-6 py-4 ">
        <div className="font-bold text-xl mb-2">{car?.brand.name} {car?.model.name} </div>
        <p className="text-gray-700 text-base">
          {car?.description}
        </p>
        
        <p className="mt-5">
          <b className="mr-3">Cena</b>{price}
        </p>
      </div>
      <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'><Link href={'/'}>Home</Link></button>
    </div>
  )
}

export default CarDetailPage

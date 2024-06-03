import { CarWithDeps } from '@/types/prismaTypes'
import Link from 'next/link'
import prisma from '@/utils/prisma'

const getCar = async (carId: string) => {

  const carObj = await prisma.car.findFirst({
    where: {
      id: {
        equals: carId,
      }
    }
  })

  return carObj
}


const CarItem = async ({ car }: { car: CarWithDeps }) => {
  const carObj = await getCar(car.id)
  return (
    <Link href={`car/${car.id}`} className="cursor-pointer">
      <div className="flex w-full rounded-md border p-2 shadow-sm hover:bg-slate-100 font-bold">{car.model.name} - {carObj?.year}</div>
    </Link>
  )
}

export default CarItem

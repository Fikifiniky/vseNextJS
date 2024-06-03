import BrandAndModelFormFields from '@/components/BrandAndModelFormFields'
import CarList from '@/components/CarList'
import prisma from '@/utils/prisma'

const getCars = async (request: string) => {

  const splitArray = request.split("%26")
  const brandIdObj = await prisma.brand.findFirst({
    where: {
      name: {
        equals: splitArray[0],
      }
    }
  })
  console.log("id " + splitArray[0])
  const modelIdObj = await prisma.carModel.findFirst({
    where: {
      name: {
        equals: splitArray[1],
      }
    }
  })
  
  const cars = await prisma.car.findMany({
    where: {
      brandId: {
        equals: brandIdObj?.id,
      },
      modelId: {
        equals: modelIdObj?.id,
      },
    },
    include: {
      model: true,
      brand: true,
    },
  })

  return cars
}


const getModels = async () => {
  const models = await prisma.carModel.findMany()
  return models
}

const getBrands = async () => {
  const brands = await prisma.brand.findMany()
  return brands
}


const HomePage = async ({ params }: { params: { id: string } }) => {
  
  const carsS = await getCars(params.id)
  const models = await getModels()
  const brands = await getBrands()


 
  return (
    <div className='mx-auto max-w-3xl'>
      <h1 className='text-2xl'>Home Page</h1>
      <form className='flex flex-col rounded-md bg-orange-200 px-10 py-5 shadow-sm shadow-gray-400'>
        <BrandAndModelFormFields models={models} brands={brands}/>
        
      </form>
      <CarList cars={carsS} />
      
    </div>
  )


}

export default HomePage

import ImageSwiper from "@/components/TripDetails/ImageSwiper";
import TripDivider from "@/components/TripDetails/TripDivider";
import TripHeader from "@/components/TripDetails/TripHeader";
import TripReservation from "@/components/TripDetails/TripReservation";
import { prisma } from "@/lib/prisma";
import "swiper/swiper-bundle.css";


const getTripDetails = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  return trip;
};

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
  const trip = await getTripDetails(params.tripId);

  if (!trip) return null;

  return (
    <section className="overflow-x-hidden dark:bg-[#18181b]">
      <div className="w-full h-full">
        <ImageSwiper imagesUrl={trip.imagesUrl} />
      </div>

      <div className="w-full mx-auto p-4 flex flex-col">
        <TripHeader trip={trip}/>
        <TripDivider/>
        <TripReservation trip={trip}/>
        <TripDivider/>
      </div>
    </section>
  );
};

export default TripDetails;
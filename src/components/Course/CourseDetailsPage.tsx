import React, { useEffect, useState } from "react";
import { useGetCourseDetailsQuery } from "../../../redux/features/courses/coursesApi";
import CustomLoader from "../global/CustomLoader";
import Heading from "@/lib/utils/Heading";
import Header from "../Header";
import Footer from "../Footer/Footer";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "../../../redux/features/orders/orderApi";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: stripePublishableKeyData } = useGetStripePublishableKeyQuery(
    {}
  );
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (stripePublishableKeyData) {
      const publishablekey = stripePublishableKeyData?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data && user) {
      const amount = Math.round(data.course.price * 100);
      const name = user?.name;
      createPaymentIntent({ amount, name });
    }
  }, [stripePublishableKeyData, data, user]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div>
          <Heading
            title={data?.course.name + " - MindX"}
            description="MindMatrix is a platform developed by Pratyush for helping students"
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {stripePromise && (
            <CourseDetails
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setRoute={setRoute}
              setOpen={setOpen}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;

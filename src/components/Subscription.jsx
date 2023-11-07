import React from "react";
import { useIsSubscribedMutation, useRazporPaySuccessMutation, useRazporpayMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";

const Subscription = () => {
  const email = localStorage.getItem("email");
  const plans = [
    {
      name: "Free Plan",
      price: "₹0",
      features: [
        "All core studio features",
        "StreamYard logo in your streams",
        "Streaming limits",
        "Local recordings - 2 hours/mo",
        "6 on-screen participants",
        "2 seats",
      ],
      color: "bg-gray-200",
      buttonColor: "bg-gray-400",
    },
    {
      name: "Basic Plan",
      price: "₹399.99",
      features: [
        "No StreamYard logo on your streams",
        "50 hours of storage",
        "Unlimited streaming",
        "Unlimited local recordings",
        "10 on-screen participants",
        "Live streams are recorded",
        "Multistream - 3 destinations",
        "Custom RTMP destinations",
        "Guest destinations",
        "Logos, Overlays, Backgrounds",
        "Pre-recorded streams - 1 hour",
      ],
      color: "bg-blue-200",
      buttonColor: "bg-blue-500",
    },
    {
      name: "Pro Plan",
      price: "₹599.99",
      features: [
        "On-Air webinars - 250 viewers",
        "Full HD (1080p)",
        "Extra camera",
        "12 backstage participants",
        "Multistream - 8 destinations",
        "4 seats",
        "Pre-recorded streams - 2 hours",
      ],
      color: "bg-purple-300",
      buttonColor: "bg-purple-600",
    },
  ];

  const [isSubscribed] = useIsSubscribedMutation();
  const [razorpay] = useRazporpayMutation();
  const [razorpaySuccess] = useRazporPaySuccessMutation();

  const upgradePlan = async (plan) => {
    try {
      const isSub = await isSubscribed().unwrap();
      if (isSub.data) {
        toast.dark("already subscribed!");
        return;
      }
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        toast.info(
          "Razorpay SDK failed to load. Check your internet connection."
        );
        return;
      }
      const params={
        plan
      };
      const result = await razorpay(params).unwrap();
      console.log("order created: ",result);
      if (!result) {
        toast.error("Server error. Are you online?");
        return;
      }
      const { amount, id: order_id, currency } = result;
      const options = {
        key: "rzp_test_g6x3wDlysFmv1M",
        amount: amount.toString(),
        currency: currency,
        name: "LiveNex",
        description: "Enjoy seamless streaming",
        image: {},
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            email,
          };
          const result = await razorpaySuccess(data).unwrap();
          if (result.msg) toast.info("payment successful");
          if (result.msg_error) toast.error("payment failure");
        },
        prefill: {
          name: "LiveNex",
          email: "livenex@gmail.com",
          contact: "8547724391",
        },
        notes: {
          address: "Example Corporate Office",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
        console.error(error)
    }
  };


  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Choose Your Plan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`border border-gray-200 p-6 rounded-lg flex flex-col justify-between ${plan.color}`}
            >
              <h3 className="text-2xl font-semibold mb-4 text-center">
                {plan.name}
              </h3>
              <p className="text-3xl font-bold mb-4 text-center">
                {plan.price}
              </p>
              <ul className="mb-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start mb-2">
                    <svg
                      className="w-4 h-4 mr-2 mt-1 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`${plan.buttonColor} hover:${plan.color} text-white font-semibold py-2 px-4 rounded-md w-full`}
                onClick={() => upgradePlan(plan.name)}
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;

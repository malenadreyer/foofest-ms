import React, { useState, useContext } from "react";
import Camping from "@/components/Camping";
import ProgressMenu from "../components/ProgressMenu";
import BookingInfo from "@/components/BookingInfo";
import PaymentForm from "@/components/PaymentForm";
import SelectOptional from "@/components/SelectOptional";
import CheckoutCompleted from "@/components/CheckoutCompleted";
import { CartContext } from "../contexts/CartContext";
import ButtonWIcon from "@/components/ButtonWIcon";
import Image from "next/image";
import StarIcon from "../../public/pics/star.svg";
 // Ikon til knapperne

function Checkout() {
  // vores state til at holde styr på hvor vi er i checkout flowet
  const [currentStep, setCurrentStep] = useState(0);
  const [reservationId, setReservationId] = useState(null);
  const {
    cartItems,
    cartTotal,
    selectedCamping,
    setSelectedCamping,
    selectedOptional,
    setSelectedOptional,
    userInfos,
    setUserInfos,
  } = useContext(CartContext);

  const updateUserInfo = (index, newInfo) => {
    setUserInfos((prevUserInfos) => {
      if (index < 0 || index >= prevUserInfos.length) {
        console.error("Invalid index for userInfos update");
        return prevUserInfos; // Prevent updating if the index is out of bounds
      }
      const updatedUserInfos = [...prevUserInfos];
      updatedUserInfos[index] = { ...updatedUserInfos[index], ...newInfo };
      return updatedUserInfos;
    });
  };
  const handlePaymentCompletion = (id) => {
    setReservationId(id); // Set the reservation ID when payment is successful.
    // Any other actions to complete the booking process.
  };
  const [paymentDetails, setPaymentDetails] = useState({
    cardOwner: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // komponenterne til checkout flowet definereres her
  const steps = [
    {
      title: "Choose Camping area",
      content: <Camping selectedCampingArea={selectedCamping} setCampingArea={setSelectedCamping} ticketCount={cartItems.length} setReservationId={setReservationId}  />,
    },
    {
      title: "Choose tent",
      content: <SelectOptional selectedOptions={selectedOptional} setOptions={setSelectedOptional} />,
    },
    {
      title: "Information",
      content: <BookingInfo userInfos={userInfos} updateUserInfo={updateUserInfo} handlePaymentCompletion={handlePaymentCompletion} />,
    },
    {
      title: "Payment",
      content: <PaymentForm paymentDetails={paymentDetails} setPaymentDetails={setPaymentDetails}  />,
    },
    {
      title: "",
      content: <CheckoutCompleted reservationId={reservationId} />,
    },
  ];

  // infoboksen som går igen igennem hele flowet
  const renderInfoBox = () => (
    <div className="p-6 bg-[var(--background)] text-[var(--font-color)] border-4 border-[var(--accent-color)] rounded-lg">
      <h3 className="text-lg font-bold mb-4">Your Selection</h3>
      {cartItems.map((item, index) => (
        <div key={index} className="mb-4">
          <p>
            <strong>Type:</strong> <span className="float-right">{item.name}</span>
          </p>
          <p>
            <strong>Amount:</strong> <span className="float-right">{item.quantity}</span>
          </p>
          <p>
            <strong>Price:</strong> <span className="float-right">{item.price * item.quantity},-</span>
          </p>
        </div>
      ))}
      <p>
        <strong>Campsite:</strong> <span className="float-right">{selectedCamping || "N/A"}</span>
      </p>
      <p>
        <strong>Tent 2 person:</strong>{" "}
        <span className="float-right">
          {selectedOptional.find((o) => o.name.includes("2 person tent"))?.quantity || "N/A"}
        </span>
      </p>
      <p>
        <strong>Tent 3 person:</strong>{" "}
        <span className="float-right">
          {selectedOptional.find((o) => o.name.includes("3 person tent"))?.quantity || "N/A"}
        </span>
      </p>
      <p>
        <strong>Green camping:</strong>{" "}
        <span className="float-right">
          {selectedOptional.find((o) => o.name.includes("Green camping"))?.quantity || "N/A"}
        </span>
      </p>
      <p>
        <strong>Booking fee:</strong> <span className="float-right">99,-</span>
      </p>
      <hr className="my-4" />
      <p className="text-xl font-bold">
        <strong>Total:</strong> <span className="float-right">{cartTotal + 99},-</span>
      </p>
    </div>
  );

  // alt det vi returnerer i browseren
  return (
    <div className="mt-40">
      {/* Progress menu fylder hele bredden */}
      {currentStep < steps.length - 1 && (
        <div className="w-full">
          <ProgressMenu currentStep={currentStep} steps={steps.slice(0, steps.length - 1)} />
        </div>
      )}
      {/* Hovedlayout */}
      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-12">
        <div className="flex-1">
          {steps[currentStep].content}
          {/* Navigation */}
          <div className="mt-8 flex justify-between">
       
          </div>
        </div>
        {/* Infoboks til højre */}
        <div className="w-full md:w-1/3 md:my-12">{renderInfoBox()}
        <div className="flex justify-center gap-2 mt-4">
          {currentStep > 0 && <ButtonWIcon text="Previous" defaultIcon={<Image src={StarIcon} alt="Previous Icon"  width={20} height={20} />} activeColor="#fffff" activeIcon={<Image src={StarIcon} alt="Previous Icon Active" width={20} height={20} />} defaultBgColor="var(--accent-color)" activeBgColor="#881523" onClick={() => setCurrentStep((prev) => prev - 1)} className="px-4 py-2 rounded-lg hover:bg-white hover:text-[var(--accent-color)]" />}
          {currentStep < steps.length - 1 && <ButtonWIcon text="Next" defaultIcon={<Image src={StarIcon} alt="Next Icon" width={20} height={20} />} activeColor="#fffff" activeIcon={<Image src={StarIcon} alt="Next Icon Active" width={20} height={20} />} defaultBgColor="var(--accent-color)" activeBgColor="#881523" onClick={() => setCurrentStep((prev) => prev + 1)} className="px-4 py-2 rounded-lg hover:bg-white hover:text-[var(--accent-color)]" />}
        </div></div>
      </div>
    </div>
  );
}

export default Checkout;
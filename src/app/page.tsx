"use client";
import React from "react";
import Image from "next/image";
// import { OverlaySigningOut } from "@/components/overlay";
import Confirmation from "@/components/overlay/Confirmation";
import { HeaderPrimary } from "@/components/header";
import { ListSimple } from "@/components/list";
import { Label, LabelDescription } from "@/components/label";
import { AddPhoneNumberForm, TextMessage } from "@/components/section";
import { ButtonPrimary } from "@/components/button";
import { v4 as uuid } from "uuid";
import MediaUpload from "@/utils/mediaUpload";
import { sanitizePhoneText } from "@/components/section/AddPhoneNumberForm";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "../../aws-exports";
import { fetchUserAttributes } from "aws-amplify/auth/cognito";
Amplify.configure(awsExports);

export interface HomeState {
  id: string;
  phoneNumber: string;
  phoneNumberFormatted: string;
  state: string;
};

export default function Home() {
  // Global state
  // const [isSigningOut] = React.useState<boolean>(false);

  const [phoneNumbers, setPhoneNumbers] = React.useState<HomeState[]>([]);
  const [textMessage, setTextMessage] = React.useState<string>();
  const [isSyncing, setSyncing] = React.useState<boolean>(false);
  const [isUploadingPhoneNumbers, setIsUploadingPhoneNumbers] = React.useState<boolean>(false);
  const [isSubmitted, setIsSubmitting] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [confirmation, setConfirmation] = React.useState<boolean>(false);

  // const toggleIsSigningOut = (): void => {
  //   setIsSigningOut(prevState => !prevState);
  // };

  const toggleConfirmation = (): void => {
    setConfirmation(prevState => !prevState);
  };

  const updateFile = (file: File): void => {
    setFile(file);
    addPhoneNumberBulk(file);
  };

  const removeFile = (): void => {
    setFile(null);
  };

  const clearRows = (): void => {
    setPhoneNumbers([]);
  };

  const toggleIsUploadingPhoneNumbers = (): void => {
    setIsUploadingPhoneNumbers(prevState => !prevState);
  };

  const addPhoneNumber = (phoneNumber: string): void => {
    // Check if item exists
    if (phoneNumber === "") return alert('Please enter a valid phone number.');

    // Check if item is already in the list
    const response = phoneNumbers.find(phoneNumberItem => phoneNumberItem.phoneNumber === phoneNumber);
    if (response) return alert('This phone number has already been added to the list');


    const newPhoneNumber = {
      id: uuid(),
      phoneNumber: phoneNumber,
      phoneNumberFormatted: `+1${phoneNumber.replaceAll('-', '').replaceAll('(', '').replaceAll(')', '')}`,
      state: "none"
    };

    console.log('Phone number object: ', newPhoneNumber);
    setPhoneNumbers(prevState => [newPhoneNumber, ...prevState]);
  };
  const addPhoneNumberBulk = (file: File): void => {
    // @ts-expect-error: We dont have types for the array yet.
    const csvPhoneNumbers = [];
    toggleIsUploadingPhoneNumbers();

    MediaUpload().parseCSV(file, () => {
      // @ts-expect-error: We dont have types for the array yet.
      console.log('All done!', csvPhoneNumbers);
      // @ts-expect-error: We dont have types for the array yet.
      setPhoneNumbers(csvPhoneNumbers);
      setTimeout(() => {
        toggleIsUploadingPhoneNumbers();
      }, 5000);
    }, (results) => {
      // @ts-expect-error: no type for restults yet.
      if (results.data[0] === 'phone_numbers' || !results.data[0]) return;
      // @ts-expect-error: no type for restults yet.
      let phoneNumber = results.data[0];

      phoneNumber = sanitizePhoneText(phoneNumber);

      const newPhoneNumber = {
        id: uuid(),
        phoneNumber: phoneNumber,
        phoneNumberFormatted: `+1${phoneNumber.replaceAll('-', '').replaceAll('(', '').replaceAll(')', '')}`,
        state: "none"
      };

      csvPhoneNumbers.push(newPhoneNumber);
    });
  };

  const deletePhoneNumber = (id: string) => {
    const newPhoneNumbers = phoneNumbers.filter(phoneNumber => phoneNumber.id !== id);
    setPhoneNumbers(newPhoneNumbers);
  };

  const sendMessagesOnSubmit = async (): Promise<void> => {
    try {
      setIsSubmitting(true);
      const currentUser = await fetchUserAttributes();

      console.log('currentUser: ', currentUser);

      const response = await fetch('https://sms.joymd.com/api/twilio', {
        method: 'POST',
        body: JSON.stringify({
          phoneNumbers: phoneNumbers,
          message: textMessage,
          username: currentUser['custom:friendly_username'],
          emailAddress: currentUser['email'],
          phoneNumber: currentUser['phone_number'],
          fromPhoneNumber: currentUser['custom:twilio_phone_number']
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();

      console.log('sendMessagesOnSubmit response: ', json);

      setTimeout(() => {
        setPhoneNumbers([]);
        setTextMessage('');
        setIsSubmitting(false);
        toggleConfirmation();
      }, 2000);
    } catch (error) {
      console.error(error)
    };
  };

  return (
    <Authenticator
      loginMechanisms={["phone_number"]} 
    >
        {({ signOut, user }) => (
          <>
            {/* {!isSigningOut ? null : <OverlaySigningOut />} */}
            {!confirmation ? null : <Confirmation toggleConfirmation={toggleConfirmation} />}
              <HeaderPrimary user={user} toggleIsSigningOut={signOut ? signOut : () => console.log("")} />
              <div className="p-4 sm:p-0 container mx-auto h-full flex flex-wrap justify-center content-center" style={{ marginTop: 20 }}>
              <div className="w-full lg pb-0 shadow-md rounded-md" style={{ maxWidth: 512 }}>
                {/* Header With Logo */}
                <div className="px-4 py-5 bg-[#5840C1] space-y-6 sm:p-6 justify-center flex rounded-t-lg">
                  <Image
                    src="/logo-joymd.png"
                    alt="Picture of the author"
                    width={134}
                    height={60}
                  />
                </div>
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <ListSimple rows={phoneNumbers} deletePhoneNumber={deletePhoneNumber} isUploadingPhoneNumbers={isUploadingPhoneNumbers} />
                  <div>
                    <Label text="Phone Number" htmlFor="phone" />
                    <LabelDescription description="A customers 10-digit cellular number. International phone numbers are not supported at this time." />
                    <AddPhoneNumberForm
                      addPhoneNumber={addPhoneNumber}
                      addPhoneNumberBulk={addPhoneNumberBulk}
                      updateFile={updateFile}
                      removeFile={removeFile}
                      clearRows={clearRows}
                      isSubmitted={isSubmitted}
                      file={file}
                      toggleIsUploadingPhoneNumbers={toggleIsUploadingPhoneNumbers}
                    />
                    <Label text="Message" htmlFor="text_message" />
                    <LabelDescription description="Write a message that every customer on your list will recieve." />
                    <TextMessage name="text_message" setTextMessage={setTextMessage} isSyncing={isSyncing} setSyncing={setSyncing} />
                  </div>
                </div>
                {/* Footer With Button */}
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <ButtonPrimary onClick={sendMessagesOnSubmit} label={!isSubmitted ? 'Send Text' : '..sending'} disabled={phoneNumbers.length === 0 || isSyncing || !textMessage || isSubmitted} />
                </div>
              </div>
              <div style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                color: 'rgba(115, 115, 115, 1)'
              }}>v1.2.0</div>
            </div>
          </>
        )}
      </Authenticator>
  );
};


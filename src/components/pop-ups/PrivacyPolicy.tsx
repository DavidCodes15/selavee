"use client";
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "@/app/privacy-policy.css";
import { Pagination, Navigation } from 'swiper/modules';
import MaxWidthWrapper from '../MaxWidthWrapper';
const PrivacyPolicy = () => {
    const [selectedSection, setSelectedSection] = useState("scope");
    const sections = ["scope", "rights", "collection", "info"];
    const totalSections = sections.length;
    const currentNumber = sections.indexOf(selectedSection) + 1;

    const handleSectionChange = (section: string) => setSelectedSection(section);
    const handlePrevious = () => {
        const currentIndex = sections.indexOf(selectedSection);
        if (currentIndex > 0) {
            setSelectedSection(sections[currentIndex - 1]);
        }
    };

    const handleNext = () => {
        const currentIndex = sections.indexOf(selectedSection);
        if (currentIndex < totalSections - 1) {
            setSelectedSection(sections[currentIndex + 1]);
        }
    };
    // const handleScope = () => {

    //     setSelectedSection("scope");
    // };
    // const handleRights = () => {

    //     setSelectedSection("rights");
    // };
    // const handleCollection = () => {

    //     setSelectedSection("collection");
    // };
    // const handleInfo = () => {

    //     setSelectedSection("info");
    // };
    return (
        <>
            <div>
                <div className='flex justify-center items-center'>
                <span className='tracking-widest text-white text-[24px] font-semibold'>Privacy Policy</span>
                </div>
                <div className='mt-12 w-full flex justify-center items-start space-x-28'>
                    <div className='flex flex-col justify-center items-start space-y-6 text-[14px] max-w-[250px] tracking-widest'>
                        <span onClick={() => handleSectionChange("scope")} className={`cursor-pointer ${selectedSection === "scope" ? "text-white font-semibold" : "text-[#4D4D4D]"}`}>Scope</span>
                        <span onClick={() => handleSectionChange("rights")} className={`cursor-pointer ${selectedSection === "rights" ? "text-white font-semibold" : "text-[#4D4D4D]"}`}>Your Rights</span>
                        <span onClick={() => handleSectionChange("collection")} className={`cursor-pointer ${selectedSection === "collection" ? "text-white font-semibold" : "text-[#4D4D4D]"}`}>Collecting and Using your personal Data</span>
                        <span onClick={() => handleSectionChange("info")} className={`cursor-pointer ${selectedSection === "info" ? "text-white font-semibold" : "text-[#4D4D4D]"}`}>Your Info</span>
                    </div>
                    <div>
                       {selectedSection === "scope" && (
                            <p className='tracking-widest text-white w-[600px]'>

                            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. The Privacy Policy is a part of the Terms of Service (also known as the “Terms”), which apply to all aspects of this Privacy Policy. The terms "Sela Vee," "we," “our,” and "us" include Sela Vee LLC and our affiliates and subsidiaries. The Privacy Policy explains our online and offline information practices, the kinds of information we may collect, how we intend to use and share that information, and how you can opt out of a use or correct or change such information. Unless defined in this Privacy Policy, all capitalized terms used herein have the same meanings as in our Terms of Service. 
                            </p>
                       )}
                       {selectedSection === "rights" && (
                        <p className='tracking-widest text-white w-[600px]'>

                        Page 2 Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. The Privacy Policy is a part of the Terms of Service (also known as the “Terms”), which apply to all aspects of this Privacy Policy. The terms "Sela Vee," "we," “our,” and "us" include Sela Vee LLC and our affiliates and subsidiaries. The Privacy Policy explains our online and offline information practices, the kinds of information we may collect, how we intend to use and share that information, and how you can opt out of a use or correct or change such information. Unless defined in this Privacy Policy, all capitalized terms used herein have the same meanings as in our Terms of Service. 
                        </p>
                       )}
                       {selectedSection === "collection" && (
                        <p className='tracking-widest text-white w-[600px]'>

                        Page 3 Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. The Privacy Policy is a part of the Terms of Service (also known as the “Terms”), which apply to all aspects of this Privacy Policy. The terms "Sela Vee," "we," “our,” and "us" include Sela Vee LLC and our affiliates and subsidiaries. The Privacy Policy explains our online and offline information practices, the kinds of information we may collect, how we intend to use and share that information, and how you can opt out of a use or correct or change such information. Unless defined in this Privacy Policy, all capitalized terms used herein have the same meanings as in our Terms of Service. 
                        </p>
                       )}
                       {selectedSection === "info" && (
                        <p className='tracking-widest text-white w-[600px]'>

                        Page 4 Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. The Privacy Policy is a part of the Terms of Service (also known as the “Terms”), which apply to all aspects of this Privacy Policy. The terms "Sela Vee," "we," “our,” and "us" include Sela Vee LLC and our affiliates and subsidiaries. The Privacy Policy explains our online and offline information practices, the kinds of information we may collect, how we intend to use and share that information, and how you can opt out of a use or correct or change such information. Unless defined in this Privacy Policy, all capitalized terms used herein have the same meanings as in our Terms of Service. 
                        </p>
                       )}
                        
                    </div>
                </div>

            </div>

            <div className='mt-24 px-12 py-4 w-full flex justify-between items-center border-t-[1px] border-[#333333] border-solid'>
                <span className='flex justify-center items-center space-x-4 text-white'>

                    <span onClick={handlePrevious} className='cursor-pointer flex justify-center items-centen space-x-2 tracking-widest'>
                        <img src="/icons/arrow-left.svg" />
                        <span>Previous</span>
                    </span>
                    <span>
                        {currentNumber} / {totalSections}
                    </span>
                    <span onClick={handleNext} className='cursor-pointer flex justify-center items-centen space-x-2 tracking-widest'>
                        
                        <span>Next</span>
                        <img src="/icons/arrow-right.svg" />
                    </span>
                </span>
                <span className='flex justify-center items-center space-x-2 text-white tracking-widest'>
                    <input type='checkbox' className='border-white border-[1px] border-solid bg-transparent' />
                    <span>I have read and agreed to the terms</span>
                </span>
            </div>      
        </>
    )
   
}

export default PrivacyPolicy
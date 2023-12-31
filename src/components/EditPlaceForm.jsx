import FormInput from "./FormInput";
import FormFileInput from "./FormFileInput";
import FormTextarea from "./FormTextarea";
import PerksContainer from "./PerksContainer";
import FormSelect from "./FormSelect";
import { Form, Link, useNavigation } from "react-router-dom";
import { perkOptions } from "../utilits/perkOptions";
import { envOptions } from "../utilits/SurroundingEnv";
import { MdOutlineClose } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import { cities, roomTypes } from "../utilits/options";

const EditPlaceForm = ({ place, errorArr }) => {
  const {
    _id,
    city,
    address,
    checkInTime,
    checkOutTime,
    description,
    extraInfo,
    maxGuests,
    owner,
    photos,
    title,
    perks,
    surroundingEnv,
    price,
    roomType,
  } = place;

  const [ogPhotos, setOgPhotos] = useState(photos);

  const deleteOgPhoto = (photo) => {
    const updateOgPhotos = ogPhotos.filter((item) => item !== photo);

    setOgPhotos(updateOgPhotos);
  };

  const changeMainPic = (photo) => {
    const otherPhotos = ogPhotos.filter((ogPhoto) => ogPhoto !== photo);
    setOgPhotos([photo, ...otherPhotos]);
  };

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Form
      method="post"
      encType="multipart/form-data"
      className="relative border p-6 rounded-lg shadow-lg shadow-grey-300 gap-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-start"
    >
      <FormInput
        defaultValue={title}
        des="房源標題，請提供簡短且吸引人的標題，以利房源廣告。"
        type="text"
        name="title"
        labelText="標題"
        placeHolder="Please provide your title."
      />
      <FormSelect
        labelText="縣市"
        name="city"
        defaultValue={city}
        list={cities}
      />
      <FormInput
        defaultValue={address}
        des="越詳細的地址資訊"
        type="text"
        name="address"
        placeHolder="請輸入小窩地址"
        labelText="地址"
      />

      <div>
        <FormFileInput />

        <p className="text-sm text-gray-400 mt-2 flex items-center">
          已上傳圖片 點擊{<BsTrash className="text-sm text-primary inline" />}
          刪除 / {<AiFillStar className="text-sm text-gray inline" />} 為首圖
        </p>
        <div className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {ogPhotos.length > 0 &&
            ogPhotos.map((photo) => (
              <div className="h-32 flex relative" key={photo}>
                <img
                  className="rounded-2xl w-full object-cover"
                  src={photo}
                  alt="place photos"
                />
                <button
                  type="button"
                  onClick={() => {
                    deleteOgPhoto(photo);
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent opacity-0 hover:opacity-80"
                >
                  <BsTrash className="text-6xl text-primary" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    changeMainPic(photo);
                  }}
                  className="absolute top-1 left-1 bg-transparent"
                >
                  {photo === ogPhotos[0] ? (
                    <AiFillStar className="text-2xl text-white opacity-1" />
                  ) : (
                    <AiFillStar className="text-2xl text-white opacity-50 hover:opacity-100" />
                  )}
                </button>
              </div>
            ))}
        </div>
      </div>
      <input
        className="hidden"
        id="ogPhotos"
        name="ogPhotos"
        readOnly
        value={ogPhotos}
      />
      <FormSelect
        labelText="房源類型"
        name="roomType"
        defaultValue={roomType}
        list={roomTypes}
      />
      <FormTextarea
        defaultValue={description}
        name="description"
        labelText="房源描述"
        des="新增您房源的描述。"
      />
      <div className="lg:col-span-2">
        <PerksContainer
          perks={perks}
          title="perks"
          labelText="公共設施"
          des="select all the perks of your place"
          options={perkOptions}
        />
      </div>
      <div className="lg:col-span-2">
        <PerksContainer
          perks={surroundingEnv}
          title="surroundingEnv"
          labelText="周邊環境"
          des="select all the perks of your place"
          options={envOptions}
        />
      </div>

      <FormTextarea
        required={false}
        defaultValue={extraInfo}
        name="extraInfo"
        labelText="更多資訊"
        des="house rules, etc..."
      />

      <div>
        <h2 className="text-2xl">入住時間 / 退房時間</h2>
        <p className="text-sm text-gray-400">
          填寫入住及退房時間，記得預留時間在退房後整理房間。
        </p>
        <div className="grid sm:grid-cols-2 gap-1 items-end">
          <FormInput
            inputError={errorArr?.includes("checkInTime should be 0 to 24.")}
            des="請輸入 0 至 24 表示時間"
            defaultValue={checkInTime}
            classValue="text-md"
            type="number"
            name="checkInTime"
            labelText="入住時間"
          />
          <FormInput
            inputError={errorArr?.includes("checkOutTime should be 0 to 24.")}
            des="請輸入 0 至 24 表示時間"
            defaultValue={checkOutTime}
            classValue="text-md"
            type="number"
            name="checkOutTime"
            labelText="退房時間"
          />
          <FormInput
            defaultValue={maxGuests}
            classValue="text-md"
            type="number"
            name="maxGuests"
            labelText="最多可訂房人數"
          />
          <FormInput
            defaultValue={price}
            classValue="text-md"
            type="number"
            name="price"
            labelText="每晚價格"
            des="幣別 TWD"
          />
        </div>
      </div>
      <Link
        to="../places"
        className="absolute top-0 right-0 p-3 hover:text-primary text-gray-500"
      >
        <MdOutlineClose className="text-2xl" />
      </Link>
      <button
        disabled={isSubmitting ? true : false}
        type="submit"
        className="primary self-end"
      >
        {isSubmitting ? "處理中..." : "確認修改"}
      </button>
    </Form>
  );
};
export default EditPlaceForm;

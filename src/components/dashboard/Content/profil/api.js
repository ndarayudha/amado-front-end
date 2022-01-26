/* eslint-disable default-case */
import { profilAction } from "./profil-slice";
import storage, {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../../../../firebase";

const ENDPOINT_GET_PROFILE = `${process.env.REACT_APP_DOMAIN}/doctor/bio?id=`;
const ENDPOINT_UPLOAD_PHOTO = `${process.env.REACT_APP_DOMAIN}/doctor/add-profile-photo`;

export const getDoctorProfile = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(ENDPOINT_GET_PROFILE + id);

      if (!response.ok) {
        throw new Error("fetch doctor profile failed");
      }

      const data = await response.json();

      return data;
    };

    try {
      const doctorProfileData = await fetchData();
      dispatch(
        profilAction.replaceDoctorProfile({
          doctor: doctorProfileData.user || [],
        })
      );
    } catch (error) {}
  };
};

export const uploadFirebase = (photo, token, doctorId) => {
  return async (dispatch) => {
    const storageRef = ref(storage, "images/" + photo.file.name);
    const uploadTask = uploadBytesResumable(
      storageRef,
      photo.file.originFileObj
    );

    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        uploadDoctorPhoto({ photo: downloadURL }, token, doctorId);
        dispatch(
          profilAction.replacePhoto({
            photo: downloadURL || null,
          })
        );
      });
    });
  };
};

const uploadDoctorPhoto = async (photo, token) => {
  const fetchData = async () => {
    const response = await fetch(ENDPOINT_UPLOAD_PHOTO, {
      method: "POST",
      body: JSON.stringify(photo),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("fetch doctor profile failed");
    }

    const data = await response.json();

    return data;
  };

  try {
    await fetchData();
  } catch (error) {}
};

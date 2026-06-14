import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PasswordSetting from "../components/PasswordSetting";
import Icons from "../../shared/icons/Icons";
import { useAccount } from "../hook/useAccount";
import { toast } from "react-toastify";
import { userAddressSchema } from "../validation/UserAddress.validator.js";
import {profileLogo} from "../../shared/utils/profileLogo";


function UnderlineField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-[9px] tracking-[0.18em] uppercase text-[#B5ADA3] mb-1.5 font-[family-name:var(--font-sans)]"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent text-[#1b1c1a] text-sm font-[family-name:var(--font-sans)]
        placeholder:text-[#d0c5b5] border-0 border-b outline-none py-2 transition-colors duration-300"
        style={{
          borderBottomColor: focused ? "#C9A96E" : "#d0c5b5",
        }}
      />
    </div>
  );
}

function UnderlineSelect({ id, label, options, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className="block text-[9px] tracking-[0.18em] uppercase text-[#B5ADA3] mb-1.5 font-[family-name:var(--font-sans)]"
        >
          {label}
        </label>
      )}

      <select
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent text-[#1b1c1a] text-sm font-[family-name:var(--font-sans)]
        border-0 border-b outline-none py-2 transition-colors duration-300 appearance-none cursor-pointer"
        style={{
          borderBottomColor: focused ? "#C9A96E" : "#d0c5b5",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <svg
        className="absolute right-0 bottom-3 w-3 h-3 text-[#B5ADA3] pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}

function AddressCard({ address, onDelete }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-start gap-3 py-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[9px] tracking-[0.15em] uppercase bg-[#eae8e5] text-[#7A6E63] px-2 py-0.5 font-[family-name:var(--font-sans)]">
            {address.label}
          </span>
        </div>

        <p className="text-sm text-[#1b1c1a] font-[family-name:var(--font-sans)] leading-snug">
          {address.addressLine}
        </p>

        <p className="text-xs text-[#7A6E63] font-[family-name:var(--font-sans)] mt-0.5">
          {[address.city, address.state, address.pincode]
            .filter(Boolean)
            .join(", ")}
        </p>
      </div>

      <button
        className={`p-1 cursor-pointer transition-opacity duration-200
        opacity-100 sm:opacity-0 ${hovered ? "sm:opacity-100" : ""}`}
        onClick={() => {
          console.log("delete address", address._id);
          onDelete(address._id);
        }}
      >
        <Icons.Delete size={16} className="text-[#7A6E63]" />
      </button>
    </div>
  );
}

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const {
    handleAddAddress,
    handleDeleteAddress,
    handleGetStates,
    handleGetCities,
    handleChangePassword,
    handleSetPassword
  } = useAccount();

  const [showAddressForm, setShowAddressForm] = useState(false);

  const [formData, setFormData] = useState({
    label: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      const res = await handleGetStates();

      if (res.success) {
        setStates(res.states);
      } else {
        toast.error(res.message);
      }
    };

    fetchStates();
  }, []);

  
  useEffect(() => {
    if (!formData.state) return;
    console.log(formData.state);

    const fetchCities = async (state) => {
      const res = await handleGetCities(state);
      if (res.success) {
        setCities(res.cities);
      } else {
        toast.error(res.message);
      }
    };

    fetchCities(formData.state);
  }, [formData.state]);

  const addNewAddress = async () => {
    const result = userAddressSchema.safeParse(formData);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    console.log(formData);
    const res = await handleAddAddress(formData);

    if (res.success) {
      toast.success(res.message);

      setFormData({
        label: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
      });

      setShowAddressForm(false);
    } else {
      toast.error(res.message);
    }
  };

  const deleteAddress = async (addressId) => {
    const res = await handleDeleteAddress(addressId);

    if (!res.success) {
      toast.error(res.message);
    }
  };


  const onSetPassword = async (password) => {
    const res = await handleSetPassword(password)
    if(res.success){
      toast.success(res.message)
    }
    else {
      toast.error(res.message)
    }
  }
  

  const onChangePassword = async (currentPassword, newPassword) => {
    const res = await handleChangePassword({currentPassword, newPassword})
    if(res.success){
      toast.success(res.message)
    }
    else {
      toast.error(res.message)
    }
  }







  return (
    <div className="min-h-screen bg-[#fbf9f6] font-[family-name:var(--font-sans)]">
      <header className="flex flex-col justify-center gap-4 px-4 py-8 items-center">
        <div className="w-14 h-14 border border-[#d0c5b5] bg-[#3b2003] flex items-center justify-center">
          <span className="font-[family-name:var(--font-serif)] text-xl text-[#fffaf5] tracking-wider">
            {profileLogo(user?.fullname)}
          </span>
        </div>

        <div>
          <h1 className="font-[family-name:var(--font-serif)] text-3xl sm:text-[2.2rem] text-[#1b1c1a] text-center leading-tight">
            {user?.fullname}
          </h1>

          <div className="mt-3 flex flex-col items-center gap-1">
            <p className="text-sm text-[#7A6E63] tracking-wide">
              {user?.email}
            </p>
             
             {user?.contact && 
             <p className="text-sm text-[#7A6E63] tracking-wide">
              +91 {user?.contact}
            </p>}
            
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-8 pb-28 space-y-14">
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl text-[#1b1c1a] font-[family-name:var(--font-serif)]">
              Saved Addresses
            </h2>

            <button
              onClick={() => setShowAddressForm((prev) => !prev)}
              className="text-[9px] tracking-[0.18em] uppercase text-[#C9A96E] hover:text-[#1b1c1a] transition-colors duration-200 cursor-pointer"
            >
              {showAddressForm ? "Close" : "+ Add New"}
            </button>
          </div>

          <div className="bg-[#f5f3f0] px-5 divide-y divide-[#d0c5b5]/30">
            {user?.addresses?.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                onDelete={deleteAddress}
              />
            ))}

            {!showAddressForm && (
              <div
                onClick={() => setShowAddressForm(true)}
                className="flex items-center gap-2 py-4 cursor-pointer group"
              >
                <Icons.Add
                  size={16}
                  className="text-[#B5ADA3] group-hover:text-[#1b1c1a] transition-colors"
                />

                <p className="text-[10px] tracking-[0.22em] uppercase text-[#B5ADA3] group-hover:text-[#1b1c1a] transition-colors">
                  Add Delivery Location
                </p>
              </div>
            )}
          </div>

          {showAddressForm && (
            <div className="mt-4 bg-white border border-[#d0c5b5]/50 px-6 py-8 animate-[wishlistFadeIn_0.35s_ease-out]">
              <p className="text-[9px] tracking-[0.22em] uppercase text-[#B5ADA3] font-medium font-[family-name:var(--font-sans)]">
                New Location Details
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-[9px] tracking-[0.18em] uppercase text-[#B5ADA3] mb-3">
                    Label
                  </p>

                  <div className="flex gap-2">
                    {["Home", "Office", "Other"].map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            label: l,
                          })
                        }
                        className={`px-4 py-1.5 text-[10px] uppercase tracking-[0.12em] transition ${
                          formData.label === l
                            ? "bg-[#1b1c1a] text-white"
                            : "bg-[#eae8e5] text-[#7A6E63]"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <UnderlineField
                  id="addressLine"
                  label="Address Line"
                  placeholder="House / Flat / Building, Street"
                  value={formData.addressLine}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      addressLine: e.target.value,
                    })
                  }
                />

                <div className="grid grid-cols-2 gap-5">
                  <UnderlineSelect
                    id="state"
                    label="State"
                    options={states}
                    placeholder="Select State"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        state: e.target.value,
                      })
                    }
                  />

                  <UnderlineSelect
                    id="city"
                    label="City"
                    options={cities}
                    placeholder="Select city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        city: e.target.value,
                      })
                    }
                  />
                </div>

                <UnderlineField
                  id="pincode"
                  label="Pincode"
                  placeholder="6-digit pincode"
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pincode: e.target.value,
                    })
                  }
                />

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddressForm(false)}
                    className="text-[10px] tracking-[0.15em] uppercase text-[#B5ADA3] hover:text-[#1b1c1a] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={addNewAddress}
                    className="bg-[#C9A96E] text-[#1b1c1a] px-8 py-3 text-[10px] tracking-[0.18em] uppercase
                    hover:bg-[#1b1c1a] hover:text-[#fbf9f6] transition-all duration-300 cursor-pointer"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <PasswordSetting 
           onSetPassword={onSetPassword}
           onChangePassword={onChangePassword}
        />
      </main>
    </div>
  );
}

"use client";

import { useAppSelector, useAppDispatch } from "@/src/store/hooks";
import { closeModal } from "@/src/store/slices/modalSlice";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface FormData {
  name: string;
  phone: string;
  email?: string;
}

export default function PurchaseModal() {
  const t = useTranslations("purchaseModal");
  const dispatch = useAppDispatch();

  const { open, lotId, artistId, lotTitle, lotImage, lotPrice } =
    useAppSelector((state) => state.purchaseModal);

  const [formData, setFormData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  if (!open) return null;

  function onSubmit(data: FormData) {
    setFormData(data);
  }

  // QR payload
  const qrPayload = formData
    ? JSON.stringify({
        provider: "Optima",
        name: formData.name,
        phone: formData.phone,
        email: formData.email || "",
        lotId,
        artistId,
        amount: lotPrice,
      })
    : "";

  return (
    <>
      {/* Заблюренный фон */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        onClick={() => dispatch(closeModal())}
      />

      {/* Модалка */}
      <aside
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-[#1A1A1A] z-60 shadow-lg p-6 transform transition-transform duration-300 overflow-y-auto"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="mb-4 text-gray-600 hover:text-gray-900 cursor-pointer"
          onClick={() => {
            setFormData(null); // Сбросим форму, если закрываем
            dispatch(closeModal());
          }}
        >
          ✕
        </button>

        {/* Инфо о лоте */}
        <div className="mb-6 flex gap-4">
          <div className="relative w-24 h-32 rounded-md overflow-hidden flex-shrink-0">
            {lotImage && (
              <Image
                src={lotImage}
                alt={lotTitle ?? "Лот"}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{lotTitle}</h2>
            <p className="text-sm text-gray-600">
              {t("price")}: {lotPrice} KGS
            </p>
          </div>
        </div>

        {/* После подтверждения — QR-код */}
        {formData ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-sm">
              Отсканируйте QR-код для оплаты через приложение Optima.
            </p>
            <QRCodeSVG value={qrPayload} size={220} />
            <p className="text-xs text-gray-500">
              {t("totalAmount")}: {lotPrice} KGS
            </p>
            <button
              onClick={() => {
                setFormData(null);
              }}
              className="text-sm text-orange-500 hover:underline cursor-pointer"
            >
              {t("changeData")}
            </button>
          </div>
        ) : (
          // Форма
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Имя */}
            <label className="text-sm font-medium w-full">
              <div className="flex items-center gap-1">
                <span>{t("name")}</span>
                <span className="text-red-600">*</span>
              </div>
              <input
                {...register("name", { required: t("enterTheName") })}
                className={`border rounded px-3 py-2 mt-1 w-full ${
                  errors.name ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <span className="text-red-600 text-xs mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </label>

            {/* Телефон */}
            <label className="text-sm font-medium w-full">
              <div className="flex items-center gap-1">
                <span>{t("phoneNumber")}</span>
                <span className="text-red-600">*</span>
              </div>
              <input
                {...register("phone", {
                  required: t("enterTheNumber"),
                  pattern: {
                    value: /^\d+$/,
                    message: t("onlyDigitsAllowed"),
                  },
                })}
                type="tel"
                className={`border rounded px-3 py-2 mt-1 w-full ${
                  errors.phone ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <span className="text-red-600 text-xs mt-1 block">
                  {errors.phone.message}
                </span>
              )}
            </label>

            {/* Email */}
            <label className="text-sm font-medium w-full">
              <div className="flex items-center gap-1">
                <span>{t("email")}</span>
                <span className="text-gray-400 text-xs">({t("optional")})</span>
              </div>
              <input
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: t("invalidMailFormat"),
                  },
                })}
                type="email"
                className={`border rounded px-3 py-2 mt-1 w-full ${
                  errors.email ? "border-red-600" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <span className="text-red-600 text-xs mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </label>

            {/* Кнопка */}
            <button
              type="submit"
              className="mt-4 bg-[#29A383] text-white py-2 rounded hover:bg-[#1c775e] transition cursor-pointer"
            >
              {t("confirm")}
            </button>
          </form>
        )}
      </aside>
    </>
  );
}

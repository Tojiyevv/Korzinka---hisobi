import React, { useState } from "react";
import {
  Search,
  Bell,
  CalendarDays,
  ShoppingBasket,
  Plus,
  Minus,
  CheckCircle2,
  ChevronDown,
  UserRound,
  Trash2,
  Leaf,
  Menu,
  X,
} from "lucide-react";


const initialWorkers = [];

const initialActivity = [];

function Avatar({ name, large = false }) {
  return (
    <div
      className={`${large ? "w-12 h-12" : "w-10 h-10"} rounded-full bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center shrink-0`}
    >
      <UserRound size={large ? 21 : 18} />
    </div>
  );
}

function Header({ onMenu }) {
  return (
    <header className="min-h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-3 sm:px-8 py-3 sm:py-0 gap-2">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onMenu}
          className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0"
        >
          <Menu size={19} />
        </button>

        <div className="flex items-center gap-2 bg-slate-50 rounded-full px-2.5 sm:px-4 py-2.5 border border-slate-100 min-w-0">
          <CalendarDays size={16} className="text-slate-600 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-700">Bugun</p>
            <p className="text-[9px] text-slate-400 whitespace-nowrap">
              12-sentabr, 2025
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <button className="relative w-10 h-10 flex items-center justify-center text-slate-500">
          <Bell size={19} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[8px] flex items-center justify-center">
            0
          </span>
        </button>

        <div className="w-9 h-9 rounded-full bg-[#0b6b43] text-white flex items-center justify-center font-black text-sm">
          S
        </div>

        <div className="hidden sm:block">
          <p className="text-xs font-black">Nizomiddin</p>
          <p className="text-[10px] text-slate-400">Administrator</p>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ open, close }) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={close}
        className="fixed inset-0 z-40 bg-black/20 lg:hidden"
      />

      <aside className="fixed z-50 left-0 top-0 bottom-0 w-[260px] max-w-[85vw] bg-[#063e2c] text-white p-5 lg:hidden">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
              <Leaf size={23} />
            </div>
            <div>
              <p className="font-black">Karzinka</p>
              <p className="text-[9px] text-white/40">HISOB TIZIMI</p>
            </div>
          </div>

          <button onClick={close}>
            <X size={20} />
          </button>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-sm font-bold">
          🧺 Karzinka hisobi
        </div>
      </aside>
    </>
  );
}

function EmptyWorkerState({ onAdd }) {
  return (
    <div className="p-6 text-center">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-[#0b6b43] flex items-center justify-center">
        <UserRound size={25} />
      </div>

      <h3 className="mt-4 text-lg font-black">Hozircha ishchi yo‘q</h3>

      <p className="mt-1 text-sm text-slate-400 leading-6">
        Tizim 0 dan boshlandi. Birinchi ishchini qo‘shing.
      </p>

      <button
        type="button"
        onClick={onAdd}
        className="mt-5 h-11 px-5 rounded-xl bg-[#0b6b43] text-white text-sm font-black inline-flex items-center gap-2 hover:bg-[#095a38] transition"
      >
        <Plus size={17} />
        Birinchi ishchini qo‘shish
      </button>
    </div>
  );
}

function WorkerList({
  workers,
  selected,
  onSelect,
  onAdd,
  onDelete,
  onClear,
}) {
  const [query, setQuery] = useState("");

  const filtered = workers.filter((w) =>
    `${w.name} ${w.phone}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white rounded-[20px] border border-slate-200 overflow-hidden shadow-sm flex flex-col max-h-[680px] lg:max-h-[calc(100vh-145px)]">
      <div className="p-4 sm:p-6 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-[18px] font-black">Ishchilar ro‘yxati</h2>

            <p className="text-sm text-slate-400 mt-1">
              Karzinka hisoblash uchun ishchini tanlang
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {workers.length > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="h-10 px-3 rounded-xl text-xs font-black text-red-500 border border-red-100 hover:bg-red-50 transition"
              >
                Hammasini o‘chirish
              </button>
            )}

            <button
              type="button"
              onClick={onAdd}
              className="h-10 px-4 rounded-xl bg-[#0b6b43] text-white text-xs font-black flex items-center gap-2 hover:bg-[#095a38] transition shadow-sm"
            >
              <Plus size={16} />
              Ishchi qo‘shish
            </button>
          </div>
        </div>

        <div className="mt-5 h-11 border border-slate-200 rounded-full flex items-center gap-2 px-4 min-w-0">
          <Search size={16} className="text-slate-500 shrink-0" />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ishchi nomi yoki telefon..."
            className="w-full min-w-0 text-xs outline-none"
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1 min-h-0">
        {filtered.length === 0 ? (
          <EmptyWorkerState onAdd={onAdd} />
        ) : (
          filtered.map((worker) => (
            <button
              key={worker.id}
              onClick={() => onSelect(worker.id)}
              className={`w-full flex items-center gap-3 px-4 sm:px-5 py-4 border-t border-slate-100 text-left transition min-w-0 ${
                selected === worker.id
                  ? "bg-[#effaf3] border-l-4 border-l-[#0b6b43]"
                  : "hover:bg-slate-50"
              }`}
            >
              <Avatar name={worker.name} />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate">
                  {worker.name}
                </p>

                <p className="text-[10px] text-[#0b6b43] font-bold mt-1 truncate">
                  {worker.brigadier || "Brigadir belgilanmagan"}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-black">
                  {worker.count} ta
                </span>

                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(worker);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      onDelete(worker);
                    }
                  }}
                  className="w-8 h-8 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition"
                  title="Ishchini o‘chirish"
                >
                  <Trash2 size={15} />
                </span>

                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    worker.count ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function WorkerCard({ worker, onAdd }) {
  if (!worker) {
    return (
      <div className="bg-white rounded-[20px] border border-slate-200 p-6 sm:p-8 shadow-sm min-h-[430px] flex items-center justify-center text-center">
        <div className="max-w-full">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center">
            <ShoppingBasket size={30} />
          </div>

          <h3 className="mt-5 text-lg font-black">
            Karzinka hisobi tayyor
          </h3>

          <p className="mt-2 text-sm text-slate-400 max-w-[280px] leading-6">
            Avval ishchi qo‘shing. Keyin shu yerda uning karzinkalarini
            hisoblash mumkin.
          </p>
        </div>
      </div>
    );
  }

  const [amount, setAmount] = useState(3);

  return (
    <div className="space-y-4 min-w-0">
      <div className="bg-white rounded-[20px] border border-slate-200 p-4 sm:p-5 shadow-sm flex items-center gap-3 min-w-0">
        <Avatar name={worker.name} large />

        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-black truncate">
            {worker.name}
          </h2>

          <p className="text-[11px] text-[#0b6b43] font-bold mt-1 truncate">
            Brigadir: {worker.brigadier || "Belgilanmagan"}
          </p>
        </div>

        <span className="px-2 sm:px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black shrink-0">
          ● Faol
        </span>
      </div>

      <div className="bg-white rounded-[20px] border border-slate-200 p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <ShoppingBasket size={17} className="text-[#0b6b43]" />
          <p className="text-sm font-black">Bugungi ko‘rsatkich</p>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <ShoppingBasket
                size={35}
                className="text-[#063e2c]"
              />

              <span className="text-[28px] sm:text-[32px] font-black">
                {worker.count} ta
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <p className="text-xs font-black text-slate-700">
            Karzinka sonini kiriting
          </p>

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setAmount((v) => Math.max(1, v - 1))
              }
              className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100"
            >
              <Minus size={17} />
            </button>

            <div className="flex-1 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black">
              {amount}
            </div>

            <button
              type="button"
              onClick={() => setAmount((v) => v + 1)}
              className="w-11 h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-100"
            >
              <Plus size={17} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => onAdd(amount)}
            className="mt-3 w-full h-12 rounded-xl bg-[#0b6b43] text-white font-black text-sm hover:bg-[#095a38] transition"
          >
            Karzinkani qo‘shish
          </button>
        </div>
      </div>
    </div>
  );
}

function Activity({ items }) {
  return (
    <div className="bg-white rounded-[20px] border border-slate-200 shadow-sm overflow-hidden min-w-0">
      <div className="p-5 border-b border-slate-100">
        <h2 className="text-[18px] font-black">
          So‘nggi faoliyat
        </h2>

        <p className="text-sm text-slate-400 mt-1">
          Oxirgi karzinka yozuvlari
        </p>
      </div>

      {items.length === 0 ? (
        <div className="p-6 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center">
            <CheckCircle2 size={25} />
          </div>

          <p className="mt-4 text-sm font-black text-slate-700">
            Hozircha faoliyat yo‘q
          </p>

          <p className="mt-1 text-xs text-slate-400 leading-5">
            Karzinka qo‘shilganda shu yerda ko‘rinadi.
          </p>
        </div>
      ) : (
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className="px-4 sm:px-5 py-4 border-t border-slate-100 flex gap-3 min-w-0"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0b6b43] flex items-center justify-center shrink-0">
                <ShoppingBasket size={18} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate">
                  {item.name}
                </p>

                <p className="text-[10px] text-slate-400 mt-1 truncate">
                  {item.brigadier}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-sm font-black text-[#0b6b43]">
                  +{item.count}
                </p>

                <p className="text-[10px] text-slate-400 mt-1">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Reports({ workers }) {
  const total = workers.reduce(
    (sum, worker) => sum + worker.count,
    0
  );

  return (
    <div className="mt-5 bg-white rounded-[20px] border border-slate-200 shadow-sm p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs text-slate-400 font-bold">
            Bugungi umumiy ko‘rsatkich
          </p>

          <p className="text-3xl font-black mt-1">
            {total} ta
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#0b6b43] flex items-center justify-center">
            <ShoppingBasket size={20} />
          </div>

          <div>
            <p className="text-xs font-black">
              {workers.length} ta ishchi
            </p>

            <p className="text-[10px] text-slate-400 mt-1">
              Tizimdagi ishchilar soni
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddWorkerModal({ onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [brigadier, setBrigadier] = useState("");

  function submit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      phone: phone.trim(),
      brigadier: brigadier.trim(),
    });
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/45 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[440px] max-h-[calc(100vh-24px)] sm:max-h-[calc(100vh-32px)] overflow-y-auto bg-white rounded-[28px] shadow-2xl animate-[modalIn_.22s_ease-out]">
        <div className="h-1.5 bg-[#0b6b43]" />

        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-black">
                Yangi ishchi
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Ishchi ma’lumotlarini kiriting
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-black text-slate-700">
                Ism familiya
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masalan: Ali Valiyev"
                className="mt-2 w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#0b6b43] focus:ring-4 focus:ring-emerald-50"
              />
            </div>

            <div>
              <label className="text-xs font-black text-slate-700">
                Brigadir
              </label>

              <input
                value={brigadier}
                onChange={(e) => setBrigadier(e.target.value)}
                placeholder="Brigadir nomi"
                className="mt-2 w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#0b6b43] focus:ring-4 focus:ring-emerald-50"
              />

              <p className="text-[10px] text-slate-400 mt-1.5">
                Bu ishchi qaysi brigadarga tegishli ekanini belgilang.
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-12 rounded-xl border border-slate-200 text-slate-700 font-black text-sm hover:bg-slate-50 transition"
              >
                Bekor qilish
              </button>

              <button
                type="submit"
                disabled={!name.trim()}
                className="flex-1 h-12 rounded-xl bg-[#0b6b43] text-white font-black text-sm hover:bg-[#095a38] disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Ishchini qo‘shish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [workers, setWorkers] = useState(initialWorkers);
  const [selectedId, setSelectedId] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [addWorkerOpen, setAddWorkerOpen] = useState(false);
  const [activity, setActivity] = useState(initialActivity);
  const [menu, setMenu] = useState(false);

  const selected =
    workers.find((worker) => worker.id === selectedId) || null;

  const addToast = (title, message, type = "success") => {
    const id = Date.now();

    setToasts((prev) => [
      ...prev,
      { id, title, message, type },
    ]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.filter((toast) => toast.id !== id)
      );
    }, 4200);
  };

  function addWorker(data) {
    const newWorker = {
      id: Date.now(),
      name: data.name,
      phone: data.phone || "",
      brigadier:
        data.brigadier || "Brigadir belgilanmagan",
      count: 0,
    };

    setWorkers((prev) => [...prev, newWorker]);
    setSelectedId(newWorker.id);
    setAddWorkerOpen(false);

    addToast(
      "Ishchi qo‘shildi",
      `"${newWorker.name}" — ${newWorker.brigadier} brigadasiga qo‘shildi.`
    );
  }

  function requestDeleteWorker(worker) {
    if (!worker) return;

    setDeleteConfirm({
      type: "worker",
      workerId: worker.id,
      name: worker.name,
    });
  }

  function requestClearAll() {
    if (!workers.length && !activity.length) return;

    setDeleteConfirm({
      type: "all",
      name: "Barcha ma’lumotlar",
    });
  }

  function confirmDelete() {
    if (!deleteConfirm) return;

    if (deleteConfirm.type === "worker") {
      const worker = workers.find(
        (item) => item.id === deleteConfirm.workerId
      );

      if (!worker) {
        setDeleteConfirm(null);
        return;
      }

      setWorkers((prev) =>
        prev.filter(
          (item) => item.id !== deleteConfirm.workerId
        )
      );

      setActivity((prev) =>
        prev.filter(
          (item) => item.workerId !== deleteConfirm.workerId
        )
      );

      if (selectedId === deleteConfirm.workerId) {
        const remaining = workers.filter(
          (item) => item.id !== deleteConfirm.workerId
        );

        setSelectedId(remaining[0]?.id ?? null);
      }

      setDeleteConfirm(null);

      addToast(
        "Ishchi o‘chirildi",
        `"${worker.name}" tizimdan o‘chirildi.`,
        "warning"
      );

      return;
    }

    setWorkers([]);
    setActivity([]);
    setSelectedId(null);
    setDeleteConfirm(null);

    addToast(
      "Ma’lumotlar tozalandi",
      "Barcha ishchilar va faoliyatlar o‘chirildi.",
      "warning"
    );
  }

  function addBaskets(amount) {
    if (!selected) return;

    setWorkers((prev) =>
      prev.map((worker) =>
        worker.id === selected.id
          ? {
              ...worker,
              count: worker.count + amount,
            }
          : worker
      )
    );

    const time = new Date().toLocaleTimeString(
      "uz-UZ",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

    setActivity((prev) =>
      [
        {
          id: Date.now(),
          name: selected.name,
          brigadier:
            selected.brigadier ||
            "Brigadir belgilanmagan",
          workerId: selected.id,
          count: amount,
          time,
          color: "green",
        },
        ...prev,
      ].slice(0, 5)
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] overflow-x-hidden">
      <MobileMenu
        open={menu}
        close={() => setMenu(false)}
      />

      <Header onMenu={() => setMenu(true)} />

      <main className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-7">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 mb-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <ShoppingBasket
                size={31}
                className="text-[#063e2c] shrink-0"
              />

              <h1 className="text-[23px] sm:text-[34px] font-black tracking-tight">
                Karzinka hisobi
              </h1>
            </div>

            <p className="text-sm text-slate-400 mt-2">
              Ishchilar tomonidan tushirilgan anorlar sonini
              hisoblang
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.02fr_1.18fr_.9fr] gap-3 sm:gap-5 items-start">
          <WorkerList
            workers={workers}
            selected={selectedId}
            onSelect={setSelectedId}
            onAdd={() => setAddWorkerOpen(true)}
            onDelete={requestDeleteWorker}
            onClear={requestClearAll}
          />

          <WorkerCard
            worker={selected}
            onAdd={addBaskets}
          />

          <Activity items={activity} />
        </div>

        <Reports workers={workers} />
      </main>

      {addWorkerOpen && (
        <AddWorkerModal
          onClose={() => setAddWorkerOpen(false)}
          onSubmit={addWorker}
        />
      )}

      {deleteConfirm && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/45 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setDeleteConfirm(null);
            }
          }}
        >
          <div className="w-full max-w-[430px] max-h-[calc(100vh-24px)] sm:max-h-[calc(100vh-32px)] overflow-y-auto bg-white rounded-[28px] shadow-2xl animate-[modalIn_.22s_ease-out]">
            <div className="h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

            <div className="p-5 sm:p-7">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                <Trash2 size={25} />
              </div>

              <h3 className="mt-5 text-xl font-black text-slate-900">
                {deleteConfirm.type === "all"
                  ? "Barcha ma’lumotlarni o‘chirasizmi?"
                  : "Ishchini o‘chirasizmi?"}
              </h3>

              <p className="mt-2 text-sm text-slate-500 leading-6">
                {deleteConfirm.type === "all"
                  ? "Barcha ishchilar, karzinka hisoblari va faoliyat tarixi o‘chiriladi. Bu amalni ortga qaytarib bo‘lmaydi."
                  : `"${deleteConfirm.name}" ishchisi va uning karzinka faoliyati o‘chiriladi. Bu amalni ortga qaytarib bo‘lmaydi.`}
              </p>

              <div className="flex flex-col-reverse sm:flex-row gap-3 mt-7">
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 h-12 rounded-xl border border-slate-200 text-slate-700 font-black text-sm hover:bg-slate-50 transition"
                >
                  Bekor qilish
                </button>

                <button
                  type="button"
                  onClick={confirmDelete}
                  className="flex-1 h-12 rounded-xl bg-red-500 text-white font-black text-sm hover:bg-red-600 transition shadow-lg shadow-red-500/20"
                >
                  O‘chirish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-5 right-3 sm:right-5 z-[120] w-[min(390px,calc(100vw-24px))] sm:w-[min(390px,calc(100vw-32px))] space-y-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-2xl shadow-2xl px-4 py-3.5 flex items-start gap-3 animate-[toastIn_.28s_ease-out] overflow-hidden"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                toast.type === "warning"
                  ? "bg-orange-50 text-orange-500"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {toast.type === "warning" ? (
                <Trash2 size={19} />
              ) : (
                <UserRound size={19} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-black text-slate-900">
                {toast.title}
              </p>

              <p className="text-xs text-slate-500 mt-0.5 leading-5">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setToasts((prev) =>
                  prev.filter(
                    (item) => item.id !== toast.id
                  )
                )
              }
              className="text-slate-300 hover:text-slate-600 shrink-0"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateX(28px) scale(.97);
          }

          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
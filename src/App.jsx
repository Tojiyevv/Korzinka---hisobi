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
    <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-5 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenu}
          className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"
        >
          <Menu size={19} />
        </button>

        <div className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2.5 border border-slate-100">
          <CalendarDays size={16} className="text-slate-600" />
          <div>
            <p className="text-[10px] font-bold text-slate-700">Bugun</p>
            <p className="text-[9px] text-slate-400">12-sentabr, 2025</p>
          </div>
        </div>
      </div>


      <div className="flex items-center gap-3">
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

      <aside className="fixed z-50 left-0 top-0 bottom-0 w-[260px] bg-[#063e2c] text-white p-5 lg:hidden">
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

function WorkerList({ workers, selected, onSelect, onAdd, onDelete, onClear }) {
  const [query, setQuery] = useState("");

  const filtered = workers.filter((w) =>
    `${w.name} ${w.phone}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white rounded-[20px] border border-slate-200 overflow-hidden shadow-sm flex flex-col max-h-[680px] lg:max-h-[calc(100vh-145px)]">
      <div className="p-5 sm:p-6 shrink-0">
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

        <div className="mt-5 h-11 border border-slate-200 rounded-full flex items-center gap-2 px-4">
          <Search size={16} className="text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ishchi nomi yoki telefon..."
            className="w-full text-xs outline-none"
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
              className={`w-full flex items-center gap-3 px-5 py-4 border-t border-slate-100 text-left transition ${
                selected === worker.id
                  ? "bg-[#effaf3] border-l-4 border-l-[#0b6b43]"
                  : "hover:bg-slate-50"
              }`}
            >
              <Avatar name={worker.name} />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate">{worker.name}</p>
                  <p className="text-[10px] text-[#0b6b43] font-bold mt-1 truncate">
                  {worker.brigadier || "Brigadir belgilanmagan"}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-black">{worker.count} ta</span>
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
      <div className="bg-white rounded-[20px] border border-slate-200 p-8 shadow-sm min-h-[430px] flex items-center justify-center text-center">
        <div>
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center">
            <ShoppingBasket size={30} />
          </div>
          <h3 className="mt-5 text-lg font-black">Karzinka hisobi tayyor</h3>
          <p className="mt-2 text-sm text-slate-400 max-w-[280px] leading-6">
            Avval ishchi qo‘shing. Keyin shu yerda uning karzinkalarini hisoblash mumkin.
          </p>
        </div>
      </div>
    );
  }
  const [amount, setAmount] = useState(3);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-[20px] border border-slate-200 p-5 shadow-sm flex items-center gap-3">
        <Avatar name={worker.name} large />

        <div className="flex-1">
          <h2 className="text-lg font-black">{worker.name}</h2>
          <p className="text-[11px] text-[#0b6b43] font-bold mt-1">
            Brigadir: {worker.brigadier || "Belgilanmagan"}
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black">
          ● Faol
        </span>
      </div>

      <div className="bg-white rounded-[20px] border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <ShoppingBasket size={17} className="text-[#0b6b43]" />
          <p className="text-sm font-black">Bugungi ko‘rsatkich</p>
        </div>

        <div className="mt-5 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <ShoppingBasket size={35} className="text-[#063e2c]" />
              <span className="text-[32px] font-black">{worker.count} ta</span>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-white rounded-[20px] border border-slate-200 p-5 shadow-sm">
        <p className="text-sm font-black">Karzinka qo‘shish</p>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setAmount((v) => Math.max(1, v - 1))}
            className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center"
          >
            <Minus size={20} />
          </button>

          <span className="w-10 text-center text-2xl font-black">
            {amount}
          </span>

          <button
            onClick={() => setAmount((v) => v + 1)}
            className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center"
          >
            <Plus size={20} />
          </button>

          <button
            onClick={() => onAdd(amount)}
            className="flex-1 h-12 rounded-xl bg-[#0b6b43] text-white font-black text-sm"
          >
            <ShoppingBasket size={17} className="inline mr-2" />
            Qo‘shish
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-3">
          {[1, 3, 5, 10].map((n) => (
            <button
              key={n}
              onClick={() => setAmount(n)}
              className="h-10 rounded-xl bg-[#f0faf4] text-[#0b6b43] text-xs font-black"
            >
              +{n}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[20px] border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <ShoppingBasket size={31} className="text-[#063e2c]" />

          <div>
            <p className="text-xs text-slate-400">Jami (bugun)</p>
            <p className="text-[28px] font-black">{worker.count} ta</p>
          </div>

          <div className="ml-auto">
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black">
              <CheckCircle2 size={12} className="inline mr-1" />
              Yaxshi davom eting!
            </span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 mt-2">
          Bugungi jami tushirilgan karzinkalar
        </p>
      </div>
    </div>
  );
}

function Activity({ items }) {
  return (
    <div className="bg-white rounded-[20px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-[18px] font-black">So‘nggi faoliyat</h2>
      </div>

      {items.length === 0 ? (
        <div className="px-6 py-12 text-center border-t border-slate-100">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center">
            <ShoppingBasket size={22} />
          </div>
          <p className="mt-4 text-sm font-black text-slate-700">
            Hozircha faoliyat yo‘q
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Karzinka qo‘shilganda bu yerda ko‘rinadi.
          </p>
        </div>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="px-5 py-4 border-t border-slate-100 flex gap-3"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                item.color === "orange"
                  ? "bg-orange-600"
                  : item.color === "green"
                  ? "bg-emerald-500"
                  : item.color === "red"
                  ? "bg-red-500"
                  : "bg-slate-400"
              }`}
            />

            <div className="flex-1">
              <p className="text-xs font-black">{item.name}</p>
              <p className="text-[10px] text-[#0b6b43] font-bold mt-0.5">
                Brigadir: {item.brigadier || "Belgilanmagan"}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {item.count} ta karzinka qo‘shildi
              </p>
            </div>

            <span className="text-[10px] text-slate-400">{item.time}</span>
          </div>
        ))
      )}

      <div className="m-5 p-4 rounded-2xl bg-[#effaf0] flex gap-3">
        <Leaf size={20} className="text-[#0b6b43]" />
        <div>
          <p className="text-xs font-black text-[#0b6b43]">Maslahat</p>
          <p className="text-[11px] text-slate-500 mt-1 leading-5">
            Har bir ishchi kunlik normani bajarishi hosilni oshiradi!
          </p>
        </div>
      </div>
    </div>
  );
}


function Reports({ workers }) {
  const [openGroups, setOpenGroups] = useState({});

  const groups = workers.reduce((acc, worker) => {
    const name = worker.brigadier || "Brigadir belgilanmagan";
    if (!acc[name]) acc[name] = [];
    acc[name].push(worker);
    return acc;
  }, {});

  const entries = Object.entries(groups).sort((a, b) =>
    a[0].localeCompare(b[0], "uz")
  );

  const toggle = (name) => {
    setOpenGroups((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  if (!workers.length) {
    return (
      <section className="mt-5 bg-white rounded-[20px] border border-slate-200 shadow-sm p-7 text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center">
          <UsersIcon />
        </div>
        <h2 className="mt-4 text-lg font-black">Hisobot</h2>
        <p className="mt-1 text-sm text-slate-400">
          Ishchilar qo‘shilgandan keyin brigadirlar bo‘yicha hisobot shu yerda chiqadi.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-5 bg-white rounded-[20px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-black">Hisobot</h2>
          <p className="text-sm text-slate-400 mt-1">
            Ishchilar brigadirlar bo‘yicha guruhlangan
          </p>
        </div>
        <div className="text-xs font-black text-slate-500">
          {entries.length} ta brigadir · {workers.length} ta ishchi
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {entries.map(([brigadier, group]) => {
          const total = group.reduce((sum, worker) => sum + worker.count, 0);
          const isOpen = !!openGroups[brigadier];

          return (
            <div key={brigadier}>
              <button
                type="button"
                onClick={() => toggle(brigadier)}
                className="w-full px-5 sm:px-6 py-4 flex items-center gap-4 text-left hover:bg-slate-50 transition"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#0b6b43] flex items-center justify-center font-black">
                  {brigadier.slice(0, 1).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm truncate">{brigadier}</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {group.length} ta ishchi
                  </p>
                </div>

                <div className="text-right mr-2">
                  <p className="text-sm font-black">{total} ta</p>
                  <p className="text-[10px] text-slate-400">jami</p>
                </div>

                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="bg-slate-50/70 border-t border-slate-100">
                  {group.map((worker) => (
                    <div
                      key={worker.id}
                      className="px-5 sm:px-8 py-3.5 flex items-center gap-3 border-b border-slate-100 last:border-b-0"
                    >
                      <Avatar name={worker.name} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black truncate">{worker.name}</p>
                      </div>
                      <span className="px-3 py-1.5 rounded-lg bg-white text-[#0b6b43] text-xs font-black border border-emerald-100">
                        {worker.count} ta
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function UsersIcon() {
  return (
    <div className="flex -space-x-2">
      <UserRound size={22} />
    </div>
  );
}

function AddWorkerModal({ onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [brigadier, setBrigadier] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name: name.trim(),
      brigadier: brigadier.trim() || "Brigadir belgilanmagan",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[90] bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[440px] bg-white rounded-[28px] shadow-2xl overflow-hidden animate-[modalIn_.22s_ease-out]">
        <div className="h-1.5 bg-[#0b6b43]" />

        <div className="p-7">
          <div className="flex items-start justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#0b6b43] flex items-center justify-center">
                <UserRound size={25} />
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-900">
                Yangi ishchi qo‘shish
              </h3>
              <p className="mt-1.5 text-sm text-slate-400">
                Ishchining ma’lumotlarini kiriting.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-700 flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-black text-slate-700">
                Ishchi ismi
              </label>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ishchining ismi"
                className="mt-2 w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#0b6b43] focus:ring-4 focus:ring-emerald-50"
              />
            </div>

<div>
              <label className="text-xs font-black text-slate-700">
                Brigadir ismi
              </label>
              <input
                value={brigadier}
                onChange={(e) => setBrigadier(e.target.value)}
                placeholder="Brigadirning ismi"
                className="mt-2 w-full h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#0b6b43] focus:ring-4 focus:ring-emerald-50"
              />
              <p className="text-[10px] text-slate-400 mt-1.5">
                Bu ishchi qaysi brigadarga tegishli ekanini belgilang.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
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

  const addToast = (title, message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4200);
  };
  const [activity, setActivity] = useState(initialActivity);
  const [menu, setMenu] = useState(false);

  const selected = workers.find((worker) => worker.id === selectedId) || null;


  function addWorker(data) {
    const newWorker = {
      id: Date.now(),
      name: data.name,
      brigadier: data.brigadier || "Brigadir belgilanmagan",
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
      const worker = workers.find((item) => item.id === deleteConfirm.workerId);
      if (!worker) {
        setDeleteConfirm(null);
        return;
      }

      setWorkers((prev) =>
        prev.filter((item) => item.id !== deleteConfirm.workerId)
      );

      setActivity((prev) =>
        prev.filter((item) => item.workerId !== deleteConfirm.workerId)
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
          ? { ...worker, count: worker.count + amount }
          : worker
      )
    );

    const time = new Date().toLocaleTimeString("uz-UZ", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setActivity((prev) => [
      {
        id: Date.now(),
        name: selected.name,
        brigadier: selected.brigadier || "Brigadir belgilanmagan",
        workerId: selected.id,
        count: amount,
        time,
        color: "green",
      },
      ...prev,
    ].slice(0, 5));
  }

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <MobileMenu open={menu} close={() => setMenu(false)} />

      <Header onMenu={() => setMenu(true)} />

      <main className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <ShoppingBasket size={31} className="text-[#063e2c]" />
              <h1 className="text-[28px] sm:text-[34px] font-black tracking-tight">
                Karzinka hisobi
              </h1>
            </div>

            <p className="text-sm text-slate-400 mt-2">
              Ishchilar tomonidan tushirilgan anorlar sonini hisoblang
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.02fr_1.18fr_.9fr] gap-5 items-start">
          <WorkerList
            workers={workers}
            selected={selectedId}
            onSelect={setSelectedId}
            onAdd={() => setAddWorkerOpen(true)}
            onDelete={requestDeleteWorker}
            onClear={requestClearAll}
          />

          <WorkerCard worker={selected} onAdd={addBaskets} />

          <Activity items={activity} />
        </div>

        <Reports workers={workers} />
      </main>

      {/* Add worker modal */}
      {addWorkerOpen && (
        <AddWorkerModal
          onClose={() => setAddWorkerOpen(false)}
          onSubmit={addWorker}
        />
      )}

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/45 backdrop-blur-sm flex items-center justify-center p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDeleteConfirm(null);
          }}
        >
          <div className="w-full max-w-[430px] bg-white rounded-[28px] shadow-2xl overflow-hidden animate-[modalIn_.22s_ease-out]">
            <div className="h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />
            <div className="p-7">
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

              <div className="flex gap-3 mt-7">
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

      {/* Mac-style notifications — only worker add/delete and clear-all */}
      <div className="fixed top-5 right-5 z-[120] w-[min(390px,calc(100vw-32px))] space-y-3 pointer-events-none">
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
              <p className="text-sm font-black text-slate-900">{toast.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-5">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() =>
                setToasts((prev) => prev.filter((item) => item.id !== toast.id))
              }
              className="text-slate-300 hover:text-slate-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(28px) scale(.97); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(12px) scale(.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

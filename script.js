const form = document.querySelector("#form-anggota");
const table = document.querySelector("#member-list tbody");

if (table) {
  const renderTable = (iterate) => {
    let out = "";
    iterate.forEach((item, index) => {
      out += `<tr>
            <th class="text-center">${index + 1}</th>
            <th>${item.nim}</th>
            <th>${item.nama}</th>
            <th>${item.email}</th>
            <th>${item.tel}</th>
            <th>${item.prodi}</th>
            <th>${item.anggota}</th>
            <th>${item.alamat}</th>
            <td class="text-center">
              <button class="btn-action btn-edit" title="Edit">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button class="btn-action btn-delete" title="Hapus">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>`;
    });

    table.innerHTML = out;
  };

  const applyFilter = (iterate) => {
    const keyword = searchInput.value.trim().toLowerCase();

    const result = iterate.filter((m) => {
      const match =
        m.nama.toLowerCase().includes(keyword) || m.nim.includes(keyword);
      const matchAnggota =
        !filterAnggota.value || m.anggota === filterAnggota.value;
      const matchProdi = !filterProdi.value || m.prodi === filterProdi.value;
      return match && matchAnggota && matchProdi;
    });

    renderTable(result);
  };

  const searchInput = document.querySelector("#cari");
  const filterAnggota = document.querySelector("#filter-keanggotaan");
  const filterProdi = document.querySelector("#filter-prodi");

  var iterate = (JSON.parse(localStorage.getItem("data")) || []).flat();
  renderTable(iterate);

  searchInput.addEventListener("input", () => applyFilter(iterate));
  filterAnggota.addEventListener("change", () => applyFilter(iterate));
  filterProdi.addEventListener("change", () => applyFilter(iterate));

  applyFilter(iterate);
}

if (form) {
  const emailInput = document.querySelector("#email");
  const errMsg = document.getElementById("error-message");
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const clearEmailError = () => {
    errMsg.style.display = "none";
    errMsg.textContent = "";
    emailInput.style.border = "";
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearEmailError();

    var retrievedObject = localStorage.getItem("data");
    var stored = JSON.parse(retrievedObject);

    const nama = document.querySelector("#nama").value.trim();
    const nim = document.querySelector("#nim").value.trim();
    const email = emailInput.value.trim();
    const telepon = document.querySelector("#telepon").value.trim();
    const prodi = document.querySelector("#prodi").value;
    const anggota = document.querySelector("#keanggotaan").value;
    const alamat = document.querySelector("#alamat").value.trim();

    if (!nama) {
      alert("Nama harus diisi!");
      return;
    }
    if (!nim) {
      alert("NIM/NIP harus diisi!");
      return;
    }
    if (!email) {
      alert("Email harus diisi!");
      return;
    }
    if (!telepon) {
      alert("Telepon harus diisi!");
      return;
    }
    if (!prodi) {
      alert("Program studi harus dipilih!");
      return;
    }
    if (!anggota) {
      alert("Jenis keanggotaan harus dipilih!");
      return;
    }
    if (!alamat) {
      alert("Alamat harus diisi!");
      return;
    }

    if (!emailPattern.test(email)) {
      errMsg.style.display = "block";
      errMsg.textContent = "Please enter a valid email address.";
      emailInput.style.border = "2px solid red";
      emailInput.focus();
      return;
    }

    console.log(
      `Data diterima\nNama: ${nama}\nNIM/NIP: ${nim}\nEmail: ${email}\nTelepon: ${telepon}\nProdi: ${prodi}\nKeanggotaan: ${anggota}\nAlamat: ${alamat}`,
    );

    var data = [];

    var newData = {
      nama: nama,
      nim: nim,
      email: email,
      tel: telepon,
      prodi: prodi,
      anggota: anggota,
      alamat: alamat,
    };
    if (stored) {
      const match = stored.some((m) => m.nim === nim);

      if (match) {
        alert("NIM/NIP sudah ada");
        return;
      }

      stored.push(newData);
      localStorage.setItem("data", JSON.stringify(stored));
    } else {
      data.push(newData);
      localStorage.setItem("data", JSON.stringify(data));
    }

    console.log(localStorage.getItem("data"));

    form.reset();
  });

  form.addEventListener("reset", clearEmailError);
}

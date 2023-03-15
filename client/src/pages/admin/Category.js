import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/forms/CategoryForm";
import { Modal } from "antd";

const AdminCategory = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  // const [visible,setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[selected,setSelected] = useState(null);
  const[updatingName,setupdatingName] = useState('');


 

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/category", { name });
      console.log(data, "17");
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadCategories();
        setName("");
        toast.success(`"${data.name}" is created `);
      }
    } catch (err) {
      console.log(err);
      toast.error("Create category failed. Try Again");
    }
  };

  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {
      // console.log('update category =>',updatingName)
      const {data} = await axios.put(`/category/${selected._id}`,{name:updatingName});
      if(data?.error){
        toast.error(data.error)
      }else{
        toast.success(`"${data.name}" is updated`);
        setSelected(null);
        setupdatingName('');
        loadCategories();
        setIsModalOpen(false)
      }
      
    } catch (err) {
      console.log(err)
      toast.error('category may already exist,Try again')

      
    }

  }

  const handleDelete = async(e)=>{
    e.preventDefault();
    try {
      // console.log('update category =>',updatingName)
      const {data} = await axios.delete(`/category/${selected._id}`);
      if(data?.error){
        toast.error(data.error)
      }else{
        toast.success(`"${data.name}" is deleted`);
        setSelected(null);
        loadCategories();
        setIsModalOpen(false)
      }
      
    } catch (err) {
      console.log(err)
      toast.error('category may already exist,Try again')

      
    }

  }

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 bg-light">
              <h4>Manage Category</h4>
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />

              <hr />
              <div className="col">
                {categories?.map((c) => (
                  <button
                    key={c._id}
                    className="btn btn-outline-primary m-3"
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelected(c);
                      setupdatingName(c.name)
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <Modal
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
              >
                <CategoryForm
                  value={updatingName}
                  setValue={setupdatingName}
                  handleSubmit={handleUpdate}
                  buttonText='update'
                  handleDelete={handleDelete}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;

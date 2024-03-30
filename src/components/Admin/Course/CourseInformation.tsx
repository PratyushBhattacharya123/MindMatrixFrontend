import { Label } from "@/components/ui/label";
import { styles } from "../../../styles/style";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useGetHeroDataQuery } from "../../../../redux/features/layout/layoutApi";
import CustomLoader from "@/components/global/CustomLoader";

interface CourseInformationProps {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
}

const CourseInformation: React.FC<CourseInformationProps> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);

  const { data, isLoading: dataLoading } = useGetHeroDataQuery("Categories");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: e.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {dataLoading ? (
        <CustomLoader />
      ) : (
        <div className="w-[80%] m-auto mt-24 mb-10">
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" className={`${styles.label}`}>
                Course Name
              </Label>
              <Input
                type="text"
                name=""
                required
                value={courseInfo.name}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, name: e.target.value })
                }
                id="name"
                placeholder="MERN stack LMS platform with Next.js"
                className={`${styles.input}`}
              />
            </div>
            <br />
            <div className="mb-5">
              <Label htmlFor="description" className={`${styles.label}`}>
                Course Description
              </Label>
              <Textarea
                name=""
                id="description"
                cols={30}
                rows={8}
                required
                placeholder="Describe your course in detail..."
                className={`${styles.input} !h-min !py-2`}
                value={courseInfo.description}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, description: e.target.value })
                }
              />
            </div>
            <br />
            <div className="flex justify-between w-full">
              <div className="w-[45%]">
                <Label htmlFor="price" className={`${styles.label}`}>
                  Course Price
                </Label>
                <Input
                  type="number"
                  name=""
                  required
                  value={courseInfo.price}
                  onChange={(e: any) =>
                    setCourseInfo({ ...courseInfo, price: e.target.value })
                  }
                  id="price"
                  placeholder="45"
                  className={`${styles.input}`}
                />
              </div>
              <div className="w-[45%]">
                <Label htmlFor="estimatedPrice" className={`${styles.label}`}>
                  Estimated Price (optional)
                </Label>
                <Input
                  type="number"
                  name=""
                  value={courseInfo.estimatedPrice}
                  onChange={(e: any) =>
                    setCourseInfo({
                      ...courseInfo,
                      estimatedPrice: e.target.value,
                    })
                  }
                  id="estimatedPrice"
                  placeholder="99"
                  className={`${styles.input}`}
                />
              </div>
            </div>
            <br />
            <div className="flex justify-between w-full">
              <div className="w-[45%]">
                <Label htmlFor="tags" className={`${styles.label}`}>
                  Course Tags
                </Label>
                <Input
                  type="text"
                  name=""
                  value={courseInfo.tags}
                  onChange={(e: any) =>
                    setCourseInfo({ ...courseInfo, tags: e.target.value })
                  }
                  id="tags"
                  placeholder="MERN, Next.js, Node.js, Express, Socket.io, Tailwin CSS..."
                  className={`${styles.input}`}
                />
              </div>
              <div className="w-[50%]">
                <Label htmlFor="courseCategories" className={`${styles.label}`}>
                  Course Categories
                </Label>
                <select
                  onChange={(e: any) =>
                    setCourseInfo({ ...courseInfo, categories: e.target.value })
                  }
                  value={courseInfo.category}
                  name="courseCategories"
                  id="courseCategories"
                  className={`${styles.input}`}
                >
                  <option value="" className="dark:bg-black/70 bg-white/50">
                    Select Category
                  </option>
                  {categories.map((category: any) => (
                    <option
                      className="dark:bg-black/70 bg-white/50"
                      value={category.title}
                      key={category._id}
                    >
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <div className="flex justify-between w-full">
              <div className="w-[45%]">
                <Label htmlFor="level" className={`${styles.label}`}>
                  Course Level
                </Label>
                <Input
                  type="text"
                  name=""
                  required
                  value={courseInfo.level}
                  onChange={(e: any) =>
                    setCourseInfo({ ...courseInfo, level: e.target.value })
                  }
                  id="level"
                  placeholder="Beginner/Intermediate/Advanced"
                  className={`${styles.input}`}
                />
              </div>
              <div className="w-[50%]">
                <Label htmlFor="demoUrl" className={`${styles.label}`}>
                  Demo URL
                </Label>
                <Input
                  type="text"
                  name=""
                  value={courseInfo.demoUrl}
                  onChange={(e: any) =>
                    setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                  }
                  id="demoUrl"
                  placeholder="mernstack/ajs123"
                  className={`${styles.input}`}
                />
              </div>
            </div>
            <br />
            <div className="w-full">
              <Input
                type="file"
                accept="image/*"
                id="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <Label
                htmlFor="file"
                className={`w-full min-h-[20vh] border-muted-foreground/25 p-3 border flex items-center justify-center rounded-[5px] ${
                  dragging ? "bg-blue-500" : "bg-transparent"
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
              >
                {courseInfo.thumbnail ? (
                  <img
                    src={courseInfo.thumbnail}
                    alt=""
                    className="max-h-full w-full object-cover"
                  />
                ) : (
                  <div className="dark:text-white/80 text-black/70 flex flex-col items-center justify-center hover:dark:text-white hover:text-black cursor-pointer">
                    <FaCloudUploadAlt
                      size={130}
                      className="text-muted-foreground/10 absolute"
                    />
                    Drag and drop your thumbnail here or click to browse
                  </div>
                )}
              </Label>
            </div>
            <br />
            <div className="w-full flex items-center justify-end">
              <Input
                type="submit"
                value="Next"
                className="w-full md:w-[180px] h-[40px] bg-[#37a39a] hover:bg-[#37a39adc] text-center text-[#fff] rounded mt-4 cursor-pointer flex items-center justify-center"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default CourseInformation;

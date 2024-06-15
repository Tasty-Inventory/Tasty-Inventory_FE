import React, { useEffect, useState } from 'react';
import * as M from '../../styles/Menu';
import { useNavigate } from 'react-router-dom';

function InventoryEditForm({ initialData, onSubmit, onDelete, inventoryId }) {
  const [inventoryData, setInventoryData] = useState({
    name: '',
    unit: '',
    image: null,
  });

  useEffect(() => {
    setInventoryData({
      name: initialData.inventoryName || '',
      unit: initialData.inventoryUnit || '',
      image: null,
    });
  }, [initialData]);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('inventoryName', inventoryData.name);
    data.append('inventoryUnit', inventoryData.unit);
    data.append('inventoryImage', inventoryData.image);

    await onSubmit(data, 'edit');
    navigate('/menulist');
  };

  const handleDelete = async () => {
    try {
      await onDelete(inventoryId);
      navigate('/menulist');
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setInventoryData({ ...inventoryData, [name]: files[0] });
    } else {
      setInventoryData({ ...inventoryData, [name]: value });
    }
  };

  return (
    <M.AddForm onSubmit={handleSubmit} encType="multipart/form-data">
      <M.FlexDiv direction="column" gap="10px">
        <M.InputLabel htmlFor="name">재고 이름</M.InputLabel>
        <M.InputWrap>
          <M.FormInput
            type="text"
            name="name"
            value={inventoryData.name}
            onChange={handleChange}
          />
        </M.InputWrap>
      </M.FlexDiv>

      <M.FlexDiv direction="column" gap="10px">
        <M.InputLabel htmlFor="unit">재고 단위</M.InputLabel>
        <M.InputWrap>
          <M.FormInput
            type="text"
            name="unit"
            value={inventoryData.unit}
            onChange={handleChange}
          />
        </M.InputWrap>
      </M.FlexDiv>

      <M.FlexDiv direction="column" gap="10px">
        <M.InputLabel htmlFor="image">재고 사진</M.InputLabel>
        <input type="file" id="image" name="image" onChange={handleChange} />
      </M.FlexDiv>

      <M.FlexDiv direction="row" gap="30px" justify="center">
        <M.SubmitButton
          type="button"
          border="0.5px solid #7B7A7A"
          onClick={() => navigate('/menulist')}
        >
          취소
        </M.SubmitButton>
        <M.SubmitButton
          type="button"
          back="#fea7a7"
          color="#fff"
          onClick={handleDelete}
        >
          삭제
        </M.SubmitButton>

        <M.SubmitButton type="submit" back="#fea7a7" color="#fff">
          수정
        </M.SubmitButton>
      </M.FlexDiv>
    </M.AddForm>
  );
}

export default InventoryEditForm;